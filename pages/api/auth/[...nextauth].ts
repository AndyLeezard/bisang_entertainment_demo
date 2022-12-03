import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
/* import GitHubProvider from "next-auth/providers/github" */
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { firebaseConfig } from "../../../lib/firebase/firebase_client"
//import { db } from "../../../lib/firebase/firebase_server"
//import AppleProvider from "next-auth/providers/apple"
//import EmailProvider from 'next-auth/providers/email'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // OAuth authentication providers...
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    /* GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }), */
    /* AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }), */
    /* EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }), */
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  pages: {
    signIn: "/auth/signin",
    /* signOut: "/auth/signout",
     * error: "/auth/error", // Error code passed in query string as ?error=,
     * verifyRequest: "/auth/verify-request", // (used for check email message),
     * newUser:
     * "/welcome", // If set, new users will be directed here on first sign in,
     */
  },
  // A database is optional, but required to persist accounts in a database
})
