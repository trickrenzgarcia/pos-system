import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";

const validatePassword = async (dbPassword: string, credPassword: string) => {
  const match = await compare(credPassword, dbPassword);
  if(!match) {
    return false;
  }
  return true;
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? ""
    }),
    Credentials({
      name: "credentials",
      credentials: {
        empId: {},
        password: {}
      },
      async authorize(credentials): Promise<any> {
        if(!credentials.empId || !credentials.password) {
          return null;
        }

        const user = (await db.select().from(users).where(eq(users.empId, credentials.empId as string)))

        if(user && await validatePassword(user[0].password as string, credentials.password as string)) {
          return user[0];
        }

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      if(token) {
        session.user.empId = token.empId;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
    async jwt({ token, user }) {
      const email = token.email
      const dbUser = (await db.select().from(users)
      .where(eq(users.email, email as string)))[0]

      if(!dbUser) {
        return token
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.image,
        empId: dbUser.empId,
        role: dbUser.role
      };
    },
    async authorized({ auth }) {
      return !!auth;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  }
})