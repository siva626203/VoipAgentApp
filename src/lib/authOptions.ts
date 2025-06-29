import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { Agent } from "@/lib/models/Agent";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await Agent.findOne({ email: credentials?.email });
        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials!.password,
          user.password_hash
        );
        if (!valid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) session.user.id = token.sub;
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
