/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    HOST: process.env.HOST,

    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    //GITHUB_ID: process.env.GITHUB_ID,
    //GITHUB_SECRET: process.env.GITHUB_SECRET,

    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    //FIREBASE_MID: process.env.FIREBASE_MID,
  },
  i18n: {
    locales: ["ko-KR", "en-US", "fr-FR"],
    defaultLocale: "ko-KR",
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
