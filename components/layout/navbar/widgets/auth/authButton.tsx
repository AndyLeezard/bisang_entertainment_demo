/* eslint-disable @next/next/no-img-element */
import React from "react"
import { Session } from "next-auth/core/types"
import { NavbarButtonProps } from "../types"
import { signOut } from "next-auth/react"
import styles from "./auth.module.css"
import common_styles from "../common.module.css"

type AuthButtonProps = Partial<NavbarButtonProps> & {
  session: Session | null
}

const AuthButton = ({
  session,
  displayDropdown,
  dismissCallback,
  clickCallback,
}: AuthButtonProps) => {
  return (
    <div style={{ position: "relative" }}>
      <div
        id={`${!session?.user ? styles.sign_in_button : styles.auth_button}`}
        onClick={() => clickCallback && clickCallback()}
      >
        {session?.user?.image ? <img src={session.user.image} alt="" /> : <></>}
        <span>
          {session?.user?.email
            ? `Signed in as ${session.user.name}`
            : `Sign in`}
        </span>
        {displayDropdown ? (
          <div
            id={styles.dropdown_base}
            className={common_styles.dropdown}
            onMouseLeave={dismissCallback}
          >
            <span
              className={`${common_styles.dropdown_item}`}
              style={{ color: "#ff6464" }}
              onClick={() => signOut()}
            >
              SignOut
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default AuthButton
