import { Request, Response } from "express";
import { AppDataSource } from "../infra/db/data-source.js";
import { ProductEntity } from "../infra/db/entities/ProductEntity.js";
import { UserRole } from "@domain/entities/User.js";

export class ProductController {
  private productRepository = AppDataSource.getRepository(ProductEntity);

  async getAll(req: Request, res: Response) {
    try {
      const products = await this.productRepository.find({
        relations: ["restaurant"]
      });
      return res.json(products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ["restaurant"]
      });

      if (!product) return res.status(404).json({ message: "Producto no encontrado" });

      return res.json(product);
    } catch (error) {
      console.error("Error al obtener producto:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getByRestaurant(req: Request, res: Response) {
    try {
      const { restaurantId } = req.params;

      if (!restaurantId) {
        return res.status(400).json({ message: "restaurantId requerido" });
      }

      const products = await this.productRepository.find({
        where: { restaurantId },
        relations: ["restaurant"]
      });

      return res.json(products);
    } catch (error) {
      console.error("Error al obtener productos del restaurante:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, price, restaurantId, category, image } = req.body;
      const user = (req as any).user;

      if (!name || !price || !restaurantId) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      if (user?.role === UserRole.RESTAURANT_OWNER) {
      }

      const product = this.productRepository.create({
        name,
        description,
        price,
        restaurantId,
        category,
        image,
      });

      await this.productRepository.save(product);
      return res.status(201).json(product);
    } catch (error) {
      console.error("Error al crear producto:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, price, restaurantId, category, image } = req.body;

      const product = await this.productRepository.findOneBy({ id });
      if (!product) return res.status(404).json({ message: "Producto no encontrado" });

      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.restaurantId = restaurantId ?? product.restaurantId;
      product.category = category ?? product.category;
      product.image = image ?? product.image;

      await this.productRepository.save(product);
      return res.json(product);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await this.productRepository.delete(id);
      if (result.affected === 0)
        return res.status(404).json({ message: "Producto no encontrado" });

      return res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
