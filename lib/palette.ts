import { clamp } from "./func"

export const bisang_bg_dark = "#212226"
export const bisang_bg_dark_accent_1 = "#393a40"

export const bisang_accent_1 = "#6DD13F"
export const bisang_accent_2 = "#CDE250"
export const bisang_accent_3 = "#CD9815"
export const bisang_accent_4 = "#E07450"

export const bisang_crimson = "#ff6464"

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