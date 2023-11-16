export const formatCurrency = (amount: number) =>
  `R$${amount.toFixed(2).toString().replace(".", ",")}`;
