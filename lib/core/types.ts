export type Currency = "usd" | "eur" | "krw"

export type Wallet = {
  id: string
  currency: Currency | string
  balance: number
  totalInput: number

  // front
  valueInUSD?: number
}
