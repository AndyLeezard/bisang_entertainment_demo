import React, { useState } from "react"
import { h2r } from "../palette"
import styles from "./UI.module.css"

type GenericButtonProps = {
  style?: React.CSSProperties
  color?: string
  text?: string
  useHover?: boolean
  children?: JSX.Element
  clickCallback: () => void
}

const GenericButton: React.FC<GenericButtonProps> = ({
  style,
  color,
  text,
  useHover,
  children,
  clickCallback,
}) => {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      className={styles.button}
      style={{
        ...style,
        backgroundColor:
          color && useHover
            ? h2r(color, hovering ? 1 : 0.75)
            : color ?? undefined,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => clickCallback()}
    >
      {children ? children : <>{text ? <span>{text}</span> : <></>}</>}
    </div>
  )
}

export default GenericButton
