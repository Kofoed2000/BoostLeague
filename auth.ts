import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";

export const { handlers, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret:
        process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({
      account,
      profile,
    }) {
      // Kun din Google-konto må bruge Google-login
      if (
        account?.provider === "google"
      ) {
        return (
          profile?.email ===
          "mikkelk.2000@gmail.com"
        );
      }

      // Discord-brugere må logge ind
      if (
        account?.provider === "discord"
      ) {
        return true;
      }

      return false;
    },

    async jwt({
      token,
      account,
      profile,
    }) {
      // Gem Discord User ID i token
      if (
        account?.provider === "discord" &&
        profile
      ) {
        token.discordId = profile.id;
        token.discordUsername =
          profile.username;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      session.user.discordId =
        token.discordId as
        string | undefined;

      session.user.discordUsername =
        token.discordUsername as
        string | undefined;

      return session;
    },
  },
});