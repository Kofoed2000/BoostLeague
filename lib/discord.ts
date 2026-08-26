export async function sendDiscordMessage(
  channelId: string,
  content: string
) {
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!token) {
    throw new Error("DISCORD_BOT_TOKEN is missing");
  }

  const response = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages`,
    {
      method: "POST",

      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        content,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    console.error(
      "Discord API error:",
      error
    );

    throw new Error(
      "Failed to send Discord message"
    );
  }
}

export async function sendNewOrderMessage(
  order: {
    id: string;
    orderNumber: string;
    serviceType: string;
    discord: string;
    platform: string;
    price: number;
  }
) {
  const channelId =
    process.env.DISCORD_NEW_ORDERS_CHANNEL_ID;

  const token =
    process.env.DISCORD_BOT_TOKEN;

  if (!channelId) {
    throw new Error(
      "DISCORD_NEW_ORDERS_CHANNEL_ID is missing"
    );
  }

  if (!token) {
    throw new Error(
      "DISCORD_BOT_TOKEN is missing"
    );
  }

  const response = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages`,
    {
      method: "POST",

      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        content: `🚀 **New Order**

**Order:** ${order.orderNumber}
**Service:** ${order.serviceType}
**Discord:** ${order.discord}
**Platform:** ${order.platform}
**Price:** €${Number(
          order.price
        ).toFixed(2)}

🟢 **Status: PAID**`,

        components: [
          {
            type: 1,

            components: [
              {
                type: 2,

                style: 1,

                label: "Claim Order",

                custom_id: `claim_order:${order.orderNumber}`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    console.error(
      "Discord API error:",
      error
    );

    throw new Error(
      "Failed to send new order message"
    );
  }
}