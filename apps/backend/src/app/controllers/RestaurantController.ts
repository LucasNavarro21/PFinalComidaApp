import { Request, Response } from "express";
import { restaurantService } from "../infra/repositories/TypeOrmRestaurantService.js";
import { RestaurantCategory } from "@domain/entities/Restaurant.js";
import { UserRole } from "@domain/entities/User.js";

export const restaurantController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const restaurants = await restaurantService.findAll();
      res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error al obtener restaurantes:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const restaurant = await restaurantService.findById(id);

      if (!restaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }

      res.status(200).json(restaurant);
    } catch (error) {
      console.error("Error al obtener restaurante:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },

  getByCategory: async (req: Request, res: Response) => {
    try {
      const { category } = req.params;

      if (!Object.values(RestaurantCategory).includes(category as RestaurantCategory)) {
        return res.status(400).json({ message: "Categoría inválida" });
      }

      const restaurants = await restaurantService.findByCategory(category as RestaurantCategory);
      res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error al filtrar restaurantes por categoría:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { name, address, phone, category, ownerId: bodyOwnerId } = req.body;

      if (!name || !address) {
        return res.status(400).json({ message: "Faltan campos obligatorios: name y address" });
      }

      const finalCategory = category && Object.values(RestaurantCategory).includes(category)
        ? category
        : RestaurantCategory.FAST_FOOD;

      const finalPhone = phone ?? "";

    
      const requesterRole = (req as any).user?.role;
      let ownerId: string | undefined;
      if (requesterRole === (UserRole as any).ADMIN) {
        ownerId = bodyOwnerId ?? (req as any).user?.id;
      } else {
        ownerId = (req as any).user?.id;
      }

      const createPayload: any = {
        name,
        address,
        phone: finalPhone,
        category: finalCategory,
      };
      if (ownerId) createPayload.ownerId = ownerId;

      const restaurant = await restaurantService.create(createPayload);

      res.status(201).json(restaurant);
    } catch (error) {
      console.error("Error al crear restaurante:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, category, address, phone } = req.body;

      if (category && !Object.values(RestaurantCategory).includes(category)) {
        return res.status(400).json({ message: "Categoría inválida" });
      }

      const updated = await restaurantService.update(id, {
        name,
        category,
        address,
        phone,
      });

      if (!updated) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }

      res.status(200).json(updated);
    } catch (error) {
      console.error("Error al actualizar restaurante:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deleted = await restaurantService.delete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar restaurante:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },
};
