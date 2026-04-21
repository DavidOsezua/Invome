export type Currency = "NGN" | "USD"

const THIN_SPACE = "\u2009"

const SYMBOLS: Record<Currency, string> = {
  NGN: "₦",
  USD: "$",
}

export function formatMoney(amount: number, currency: Currency = "NGN"): string {
  const sign = amount < 0 ? "-" : ""
  const formatted = new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(Math.abs(amount))

  return `${sign}${SYMBOLS[currency]}${THIN_SPACE}${formatted}`
}
