export function calculateDiscount(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;

  return Math.round(discountedPrice);
}
