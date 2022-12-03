import React, { useMemo } from "react"
import { default_icon_size } from "./constants"
import { NavbarButtonProps } from "./types"
import common_styles from "./common.module.css"
import ThemeButton from "./theme/themeButton"
import LanguageButton from "./language/languageButton"
import LanguagesDropdown from "./language/languagesDropdown"

const NavbarButton = ({
  width,
  height,
  displayDropdown,
  buttonID,
  dismissCallback,
  clickCallback,
}: NavbarButtonProps) => {
  const dimensions = useMemo(() => {
    return [width ?? default_icon_size, height ?? default_icon_size]
  }, [width, height])
  const borderRadius = useMemo(() => {
    const scale = 0.1
    return Math.round(((dimensions[0] + dimensions[1]) / 2) * scale)
  }, [dimensions])
  const iconScale = useMemo(() => {
    const scale = 0.66
    return Math.min(
      Math.round(dimensions[0] * scale),
      Math.round(dimensions[1] * scale)
    )
  }, [dimensions])

  return (
    <div style={{ position: "relative" }}>
      <button
        className={common_styles.btn}
        style={{
          borderRadius: `${borderRadius}px`,
          width: `${dimensions[0]}px`,
          height: `${dimensions[1]}px`,
        }}
        onClick={clickCallback}
      >
        {buttonID === "theme" ? (
          <ThemeButton iconScale={iconScale} />
        ) : buttonID === "lang" ? (
          <LanguageButton iconScale={iconScale} />
        ) : (
          <span>Unknown</span>
        )}
      </button>
      {displayDropdown ? (
        <>
          {buttonID === "lang" ? (
            <LanguagesDropdown
              dimension={dimensions}
              borderRadius={borderRadius}
              dismissCallback={dismissCallback}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default NavbarButton
