import React, { useContext, useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import styles from "./balanceSynthesis.module.css"
/* import { TypingText } from "../../lib/UI/typingText"
import { shuffleArray } from "../../lib/func" */
import KeiboButton from "../../lib/UI/KeiboButton"
import { keibo_accent_1 } from "../../lib/palette"
import { AppContext } from "../../lib/contexts"

type banalceSynthesisProps = {}

const BanalceSynthesis = (props: banalceSynthesisProps) => {
  const { os } = useContext(AppContext)
  const { data: session } = useSession()
  /* const [textList] = useState(
    shuffleArray([
      "favorite investment portfolio tracker",
      "personal financial analytics",
      "first crypto trading simulator",
      "new budget app",
    ])
  ) */

  useEffect(() => {
    if (session) {
    }
  }, [session])

  return (
    <div id={styles.wrapper}>
      {session ? (
        <></>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            userSelect: "none",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🚀 WELCOME TO BISANG 🚀</span>
          {/* <div style={{ display: "flex" }}>
            <span>Your{String.fromCharCode(160)}</span>
            <TypingText texts={textList} waitbt={50} wait={3000} speed={27} />
          </div> */}
          <KeiboButton
            text="Sign In"
            useHover={!os.isTouchDevice}
            color={keibo_accent_1}
            style={{ marginTop: "0.5rem" }}
            clickCallback={() => signIn()}
          />
        </div>
      )}
    </div>
  )
}

export default BanalceSynthesis
