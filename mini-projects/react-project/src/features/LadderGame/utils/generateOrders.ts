export const generateOrders = (
  participants: number,
  setOrders: (orders: number[]) => void
) => {
  const arr = Array.from({ length: participants }).map((_, i) => i + 1);

  const orders = arr.sort(() => Math.random() - 0.5);

  setOrders(orders);
};
