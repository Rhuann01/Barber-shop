import { authSessionOptions } from "@/app/_lib/auth-options";
import NextAuth from "next-auth";

const handler = NextAuth(authSessionOptions);

export { handler as GET, handler as POST };
