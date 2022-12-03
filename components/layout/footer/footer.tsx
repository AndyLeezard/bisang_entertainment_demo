import React from "react"
import Image from "next/image"
import styles from "./footer.module.css"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/AndyLeezard"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.line}>
          © 2022 | Andy Lee
          <span className={styles.icon}>
            <Image
              src="/lizard888.svg"
              alt="Vercel Logo"
              width={16}
              height={16}
            />
          </span>
        </span>
        <span className={styles.line}>
          All Rights Reserved
          <span className={styles.icon}>
            <Image
              src="/favicon.ico"
              alt="Vercel Logo"
              width={16}
              height={16}
            />
          </span>
        </span>
        <span className={styles.version}>
          0.0.1
          {/* process.env.NEXT_PUBLIC_VERSION */}
        </span>
      </a>
    </footer>
  )
}

export default Footer
