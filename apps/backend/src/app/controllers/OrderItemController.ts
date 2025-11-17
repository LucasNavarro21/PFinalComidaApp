import { Request, Response } from "express";
import { AppDataSource } from "../infra/db/data-source.js";
import { OrderItemEntity } from "../infra/db/entities/OrderItem.entity.js";
import { ProductEntity } from "../infra/db/entities/ProductEntity.js";
import { OrderEntity } from "../infra/db/entities/OrderEntity.js";

export class OrderItemController {
  private orderItemRepository = AppDataSource.getRepository(OrderItemEntity);
  private productRepository = AppDataSource.getRepository(ProductEntity);
  private orderRepository = AppDataSource.getRepository(OrderEntity);

  async create(req: Request, res: Response) {
    try {
      const { orderId, productId, quantity } = req.body;

      if (!orderId || !productId || !quantity)
        return res.status(400).json({ message: "Faltan campos obligatorios" });

      const order = await this.orderRepository.findOneBy({ id: orderId });
      if (!order)
        return res.status(404).json({ message: "Orden no encontrada" });

      const product = await this.productRepository.findOneBy({ id: productId });
      if (!product)
        return res.status(404).json({ message: "Producto no encontrado" });

      const subtotal = product.price * quantity;

      const orderItem = this.orderItemRepository.create({
        order,
        product,
        quantity,
        subtotal,
      });

      await this.orderItemRepository.save(orderItem);
      return res.status(201).json(orderItem);
    } catch (error) {
      console.error("Error al crear el ítem:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const items = await this.orderItemRepository.find({
        relations: ["order", "product"],
      });
      return res.json(items);
    } catch (error) {
      console.error("Error al obtener ítems:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getByOrderId(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const items = await this.orderItemRepository.find({
        where: { order: { id: orderId } },
        relations: ["product"],
      });
      return res.json(items);
    } catch (error) {
      console.error("Error al obtener ítems de la orden:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const item = await this.orderItemRepository.findOne({
        where: { id },
        relations: ["product"],
      });
      if (!item) return res.status(404).json({ message: "Ítem no encontrado" });

      item.quantity = quantity;
      item.subtotal = item.product.price * quantity;

      await this.orderItemRepository.save(item);
      return res.json(item);
    } catch (error) {
      console.error("Error al actualizar ítem:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.orderItemRepository.delete(id);

      if (result.affected === 0)
        return res.status(404).json({ message: "Ítem no encontrado" });

      return res.json({ message: "Ítem eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar ítem:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
