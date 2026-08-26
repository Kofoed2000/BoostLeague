import "dotenv/config";

import {
  Client,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";

import { prisma } from "../lib/prisma";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", async () => {
  console.log(
    `✅ Logged in as ${client.user?.tag}`
  );

  const channel = await client.channels.fetch(
    process.env.DISCORD_BOT_LOGS_CHANNEL_ID!
  );

  if (channel instanceof TextChannel) {
    await channel.send(
      "🚀 BoostLeague bot is online!"
    );
  }
});

client.on(
  "interactionCreate",
  async (interaction) => {
    if (!interaction.isButton()) {
      return;
    }

    if (
      !interaction.customId.startsWith(
        "claim_order:"
      )
    ) {
      return;
    }

    try {
      const orderNumber =
        interaction.customId.replace(
          "claim_order:",
          ""
        );

      // Svarer med det samme til Discord,
      // så interaction ikke timer ud
      await interaction.deferReply({
        ephemeral: true,
      });

      // Finder ordren
      const order =
        await prisma.order.findUnique({
          where: {
            orderNumber,
          },
        });

      if (!order) {
        await interaction.editReply(
          "❌ Order could not be found."
        );

        return;
      }

      // Kun paid ordrer må claimes
      if (order.status !== "paid") {
        await interaction.editReply(
          "❌ This order has already been claimed or is no longer available."
        );

        return;
      }

      // Opdater kun hvis den stadig er paid.
      // Det forhindrer to personer i at
      // claime ordren samtidig.
      const updateResult =
        await prisma.order.updateMany({
          where: {
            orderNumber,
            status: "paid",
          },
          data: {
            status: "in-progress",
          },
        });

      if (updateResult.count === 0) {
        await interaction.editReply(
          "❌ Someone else already claimed this order."
        );

        return;
      }

      // Finder active-orders kanalen
      const activeOrdersChannel =
        await client.channels.fetch(
          process.env
            .DISCORD_ACTIVE_ORDERS_CHANNEL_ID!
        );

      if (
        !activeOrdersChannel ||
        !(activeOrdersChannel instanceof TextChannel)
      ) {
        throw new Error(
          "Active orders channel not found."
        );
      }

      // Sender ordren til active-orders
      await activeOrdersChannel.send({
        content: `🟠 **Active Order**

**Order:** ${order.orderNumber}
**Service:** ${order.serviceType}
**Discord:** ${order.discord}
**Platform:** ${order.platform}
**Price:** €${Number(
          order.price
        ).toFixed(2)}

👤 **Claimed by:** ${interaction.user}

🟠 **Status: IN PROGRESS**`,
      });

      // Sletter den gamle besked
      await interaction.message.delete();

      // Sender privat bekræftelse til boosteren
      await interaction.editReply(
        `✅ You successfully claimed **${order.orderNumber}**!`
      );

      console.log(
        `Order ${order.orderNumber} claimed by ${interaction.user.tag}`
      );
    } catch (error) {
      console.error(
        "Claim order error:",
        error
      );

      if (
        interaction.deferred ||
        interaction.replied
      ) {
        await interaction.editReply(
          "❌ Something went wrong while claiming the order."
        );
      } else {
        await interaction.reply({
          content:
            "❌ Something went wrong while claiming the order.",
          ephemeral: true,
        });
      }
    }
  }
);

client.login(
  process.env.DISCORD_BOT_TOKEN
);