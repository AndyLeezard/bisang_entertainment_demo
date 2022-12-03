import React from "react"
import Head from "next/head"
import Footer from "./footer"

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      {/* <Navbar links={data.links} /> */}
      <Head>
        <title>Keibo - Investment Tracker</title>
        <meta
          name="description"
          content="Customized real-time simulation & tracking solution for your crypto / NFT / stock / funds investment and trading portfolio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
