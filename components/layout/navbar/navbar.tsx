import React, { useState } from "react"
import styles from "./navbar.module.css"
import { useTheme } from "next-themes"
import { useSession, signIn, signOut } from "next-auth/react"
import NavbarButton from "./widgets/navbarButton"
import { ButtonID } from "./widgets/types"
import AuthButton from "./widgets/auth/authButton"

type NavbarProps = {
  hideSignin?: boolean
}

const Navbar = ({ hideSignin }: NavbarProps) => {
  const [dropDownID, setDropdownID] = useState<ButtonID | "">("")
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (!theme || theme === "system") {
      setTheme(
        Boolean(
          window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
          ? "light"
          : "dark"
      )
      return
    }
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div id={styles.wrapper}>
      {/* left header */}
      <div style={{ width: "50px" }}>Left</div>
      {/* core section */}
      <div style={{ flex: 1, textAlign: "center" }}>Center</div>
      {/* right header */}
      {hideSignin ? (
        <></>
      ) : (
        <AuthButton
          session={session}
          displayDropdown={dropDownID === "auth"}
          dismissCallback={() => setDropdownID("")}
          clickCallback={() => {
            if (session) {
              setDropdownID((prev) => (prev === "auth" ? "" : "auth"))
            } else {
              signIn()
            }
          }}
        />
      )}
      <NavbarButton
        buttonID="lang"
        displayDropdown={dropDownID === "lang"}
        dismissCallback={() => setDropdownID("")}
        clickCallback={() =>
          setDropdownID((prev) => (prev === "lang" ? "" : "lang"))
        }
        dropdownCallback={() => {
          setDropdownID("")
        }}
      />
      <div style={{ width: 10 }} />
      <NavbarButton
        buttonID="theme"
        displayDropdown={dropDownID === "theme"}
        dismissCallback={() => setDropdownID("")}
        clickCallback={toggleTheme}
      />
    </div>
  )
}

export default Navbar
