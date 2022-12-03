export const clamp = (min: number, max: number, input: number) =>
  input > max ? max : input < min ? min : input
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))
export const randBool = (output?: { positive: any; negative: any }) => {
  const res = Math.random() >= 0.5
  if (output) {
    return res ? output.positive : output.negative
  }
  return res
}
export const deepCopy = (variable: any) => {
  return JSON.parse(JSON.stringify(variable))
}
export const shuffleArray = (unshuffled: any) => {
  if (!(unshuffled instanceof Array)) return unshuffled
  return unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
