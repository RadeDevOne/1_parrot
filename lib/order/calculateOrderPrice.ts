import type { ExpectedDataProps } from "@/pages/place-order/[orderId]";

export default function calculatePrice(order: ExpectedDataProps["order"]) {
  const { items, shippingPrice: sp, taxPrice: tp } = order;

  const shippingPrice = parseFloat(sp);
  const taxPrice = tp || 14.66;

  let total = shippingPrice;

  items.forEach((item) => {
    const { price: p } = item.product;
    const { quantity } = item;

    const price = parseFloat(p);

    total = total + quantity * price;
  });

  total = total + (taxPrice * total) / 100;

  return total;
}

export const caclPercents = (taxPrice: number, amount: number) => {
  return (taxPrice * amount) / 100;
};
