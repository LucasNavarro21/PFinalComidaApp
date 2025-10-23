import { Request, Response } from "express";
import { AppDataSource } from "../infra/db/data-source";
import { Restaurant } from "../infra/db/entities/Restaurant.entity.js";

export class RestaurantController {
  private restaurantRepository = AppDataSource.getRepository(Restaurant);

  async create(req: Request, res: Response) {
    try {
      const { name, address, phone, category } = req.body;

      if (!name || !address || !phone) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      const restaurant = this.restaurantRepository.create({
        name,
        address,
        phone,
        category,
      });

      await this.restaurantRepository.save(restaurant);
      return res.status(201).json(restaurant);
    } catch (error) {
      console.error("Error al crear restaurante:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const restaurants = await this.restaurantRepository.find();
      return res.json(restaurants);
    } catch (error) {
      console.error("Error al obtener restaurantes:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const restaurant = await this.restaurantRepository.findOneBy({ id });

      if (!restaurant)
        return res.status(404).json({ message: "Restaurante no encontrado" });

      return res.json(restaurant);
    } catch (error) {
      console.error("Error al obtener restaurante:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, address, phone, category, rating } = req.body;

      const restaurant = await this.restaurantRepository.findOneBy({ id });
      if (!restaurant)
        return res.status(404).json({ message: "Restaurante no encontrado" });

      restaurant.name = name ?? restaurant.name;
      restaurant.address = address ?? restaurant.address;
      restaurant.phone = phone ?? restaurant.phone;
      restaurant.category = category ?? restaurant.category;
      restaurant.rating = rating ?? restaurant.rating;

      await this.restaurantRepository.save(restaurant);
      return res.json(restaurant);
    } catch (error) {
      console.error("Error al actualizar restaurante:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const restaurant = await this.restaurantRepository.findOneBy({ id });

      if (!restaurant)
        return res.status(404).json({ message: "Restaurante no encontrado" });

      await this.restaurantRepository.remove(restaurant);
      return res.json({ message: "Restaurante eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar restaurante:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
