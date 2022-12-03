import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/layout"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { AppWrapper } from "../lib/contexts"
import WavyBackground from "../components/layout/wavyBackground"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <ThemeProvider>
        <SessionProvider session={session}>
          <AppWrapper >
            <WavyBackground useColorMatrix/>
            <Component {...pageProps} />
          </AppWrapper>
        </SessionProvider>
      </ThemeProvider>
    </Layout>
  )
}

export default MyApp
