import { Client, GatewayIntentBits } from "discord.js";

const globalForDiscord = globalThis as unknown as {
  discord?: Client;
};

export const discord =
  globalForDiscord.discord ??
  new Client({
    intents: [GatewayIntentBits.Guilds],
  });

if (process.env.NODE_ENV !== "production") {
  globalForDiscord.discord = discord;
}

let loggedIn = false;

export async function startDiscordBot() {
  if (loggedIn) return;

  await discord.login(
    process.env.DISCORD_BOT_TOKEN
  );

  loggedIn = true;

  console.log("Discord bot online");
}