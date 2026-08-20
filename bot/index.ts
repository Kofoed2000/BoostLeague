import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", async () => {
  console.log(
    `✅ Logged in as ${client.user?.tag}`
  );

  const channel = client.channels.cache.get(
    process.env.DISCORD_BOT_LOGS_CHANNEL_ID!
  ) as TextChannel;

  await channel.send(
    "🚀 BoostLeague bot is online!"
  );
});

client.login(
  process.env.DISCORD_BOT_TOKEN
);