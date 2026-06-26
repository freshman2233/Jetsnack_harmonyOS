export function formatPrice(price: number): string {
  const dollars = price / 100;
  return '$' + dollars.toFixed(2);
}
