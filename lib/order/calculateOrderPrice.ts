import type { ExpectedDataProps } from "@/pages/place-order/[orderId]";

export default function calculatePrice(order: ExpectedDataProps["order"]) {
  const { items, shippingPrice, taxPrice } = order;

  items.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;
  });
}
