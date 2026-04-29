import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/_lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

export const authSessionOptions: AuthOptions = {
  /* Aconteceu algo estranho o erro de compatibilidade simplismente sumiu ao apagar o .next e gerar novamente */
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      };

      return session;
    },
  },
};
