export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
    category?: string;
  };
};


export type Order = {
  id: number;
  customerName: string;
  total: number;
  items: OrderItem[];
};
