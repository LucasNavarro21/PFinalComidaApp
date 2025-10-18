import { OrderService } from "../../services/OrderService";
import { ProductService } from "../../services/ProductService";
import { OrderItemService } from "../../services/OrderItemService";
import { OrderItem } from "../../entities/OrderItem";
import { randomUUID } from "crypto";

interface AddItemToOrderInput {
  orderId: string;
  productId: string;
  quantity: number;
}

export class AddItemToOrder {
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private orderItemService: OrderItemService
  ) {}

  async execute({ orderId, productId, quantity }: AddItemToOrderInput): Promise<OrderItem> {
const order = await this.orderService.findById(orderId);
if (!order) throw new Error(`Order with id ${orderId} not found`);

const product = await this.productService.findById(productId);
if (!product) throw new Error(`Product with id ${productId} not found`);

const newItem: OrderItem = {
  id: randomUUID(),
  orderId: order.id,
  productId: product.id,
  quantity,
  unitPrice: product.price, 
  subtotal: quantity * product.price,
  createdAt: new Date(),
  updatedAt: new Date(),
};

await this.orderItemService.save(newItem);

order.items.push(newItem);

order.totalPrice += newItem.subtotal;

await this.orderService.editOne(order);

return newItem;

  }
}
