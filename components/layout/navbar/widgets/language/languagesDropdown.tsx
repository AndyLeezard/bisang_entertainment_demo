import React, { useContext } from "react"
import common_styles from "../common.module.css"
import { supportedLangs } from "../constants"
import { DropDown } from "../types"
import { AppContext } from "../../../../../lib/contexts"

const LanguagesDropdown = ({
  dimension,
  borderRadius,
  dismissCallback,
}: DropDown) => {
  const { os, prefs } = useContext(AppContext)

  console.log({
    current: prefs.locale.current,
    default: prefs.locale.default,
  })
  return (
    <div
      className={common_styles.dropdown}
      style={{
        top: `${dimension[1] + 16}px`,
        right: `${dimension[0] + 18}px`,
        borderRadius: borderRadius,
      }}
      onMouseLeave={dismissCallback}
    >
      {supportedLangs.map((l, i) => (
        <span
          key={i}
          className={`${common_styles.dropdown_item} ${
            prefs.locale.current === l.format
              ? common_styles.dropdown_item_selected
              : "" /* common_styles.dropdown_item_unselected */
          }`}
          onMouseDown={() => {
            localStorage.setItem("lang", l.format)
            prefs.locale.set(l.format)
            if (os.isTouchDevice) {
              dismissCallback()
            }
          }}
        >
          {l.displayName}
        </span>
      ))}
    </div>
  )
}

export default LanguagesDropdown
