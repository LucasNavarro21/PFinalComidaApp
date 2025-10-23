import { Request, Response } from "express";
import { AppDataSource } from "../infra/db/data-source";
import { Order } from "../infra/db/entities/Order.entity";
import { OrderItem } from "../infra/db/entities/OrderItem.entity";
import { Product } from "../infra/db/entities/Product.entity";
import { User } from "../infra/db/entities/User.entity";
import { Restaurant } from "../infra/db/entities/Restaurant.entity";

export class OrderController {
  private orderRepository = AppDataSource.getRepository(Order);
  private orderItemRepository = AppDataSource.getRepository(OrderItem);
  private productRepository = AppDataSource.getRepository(Product);
  private userRepository = AppDataSource.getRepository(User);
  private restaurantRepository = AppDataSource.getRepository(Restaurant);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, restaurantId, items } = req.body;

      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) return res.status(404).json({ message: "User not found" });

      const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
      if (!restaurant)
        return res.status(404).json({ message: "Restaurant not found" });

      const order = this.orderRepository.create({
        user,
        restaurant,
        status: "CREATED",
      });

      const savedOrder = await this.orderRepository.save(order);

      const orderItems: OrderItem[] = [];
      let total = 0;

      for (const item of items) {
        const product = await this.productRepository.findOneBy({ id: item.productId });
        if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });

        const subtotal = product.price * item.quantity;
        total += subtotal;

        const orderItem = this.orderItemRepository.create({
          order: savedOrder,
          product, 
          quantity: item.quantity,
          subtotal,
        });

        orderItems.push(orderItem);
      }

      await this.orderItemRepository.save(orderItems);

      savedOrder.total = total;
      const finalOrder = await this.orderRepository.save(savedOrder);

      return res.status(201).json(finalOrder);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating order" });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await this.orderRepository.find({
        relations: ["user", "restaurant", "items", "items.product"],
      });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching orders" });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: req.params.id },
        relations: ["user", "restaurant", "items", "items.product"],
      });
      if (!order) return res.status(404).json({ message: "Order not found" });
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching order" });
    }
  }

   async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body; // Por ahora solo actualizamos el estado

      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }

      if (status) {
        order.status = status;
      }

      await this.orderRepository.save(order);
      return res.json(order);
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }


  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.orderRepository.delete(req.params.id);
      if (result.affected === 0)
        return res.status(404).json({ message: "Order not found" });
      return res.json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting order" });
    }
  }
}
