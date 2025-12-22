export const currencyFormat = (price: number, unit: string) =>
  new Intl.NumberFormat().format(price) + unit
