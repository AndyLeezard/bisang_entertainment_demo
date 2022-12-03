import { clamp } from "./func"

export const keibo_bg_dark = "#212226"
export const keibo_bg_dark_accent_1 = "#393a40"

export const keibo_accent_1 = "#3f54d1"
export const keibo_accent_2 = "#517fe2"
export const keibo_accent_3 = "#15cdcb"
export const keibo_accent_4 = "#4fe0b5"

export const keibo_crimson = "#ff6464"

export const h2r = (hex: string, alpha = 1) => {
  const hexToArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const result = hexToArray
    ? `rgba(${parseInt(hexToArray[1], 16)},${parseInt(
        hexToArray[2],
        16
      )},${parseInt(hexToArray[3], 16)},${clamp(0, 1, alpha)})`
    : `rgba(0, 0, 0, 1)`
  return result
}