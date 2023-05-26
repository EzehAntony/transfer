import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import dbConnect from "@/util/mongodb";
import users from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username: credentialUsername, password: credentialPassword } =
          credentials;
        await dbConnect();
        const user = await users.findOne(
          { username: credentialUsername },
          { history: 0 }
        );
        if (user) {
          // compare passwords
          const isPasswordCorrect = await bcrypt.compare(
            credentialPassword,
            user.pin
          );
          console.log(isPasswordCorrect);
          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          } else {
            return user;
          }
        } else {
          throw new Error("No such user in the database!");
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    signingKey: process.env.JWT,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.JWT,

  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
