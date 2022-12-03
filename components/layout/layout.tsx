import React from "react"
import Head from "next/head"
import Footer from "./footer"

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      {/* <Navbar links={data.links} /> */}
      <Head>
        <title>Bisang Entertainment - Homepage Prototype</title>
        <meta
          name="description"
          content="Prototype created by Andy Lee"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
