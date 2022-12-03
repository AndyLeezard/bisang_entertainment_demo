import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/layout"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { AppWrapper } from "../lib/contexts"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Layout>
      <ThemeProvider>
        <SessionProvider session={session}>
          <AppWrapper>
            {/* <div
              className="absolute-fill fade-in-2"
              style={{ overflow: "hidden", zIndex: -5 }}
            /> */}
            <Component {...pageProps} />
          </AppWrapper>
        </SessionProvider>
      </ThemeProvider>
    </Layout>
  )
}

export default MyApp
