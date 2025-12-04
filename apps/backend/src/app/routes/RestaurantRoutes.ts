import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController.js";
import { ProductController } from "../controllers/ProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UserRole } from "@domain/entities/User.js";

const restaurantRoutes = Router();
const productController = new ProductController();

restaurantRoutes.get("/", (req, res) => restaurantController.getAll(req, res));

restaurantRoutes.get("/:restaurantId/products", (req, res) => 
  productController.getByRestaurant(req, res)
);

restaurantRoutes.get("/:id", (req, res) => restaurantController.getById(req, res));

restaurantRoutes.post("/", authMiddleware(UserRole.ADMIN), (req, res) =>
  restaurantController.create(req, res)
);

restaurantRoutes.put("/:id", authMiddleware(UserRole.RESTAURANT_OWNER), (req, res) =>
  restaurantController.update(req, res)
);

restaurantRoutes.delete("/:id", authMiddleware(UserRole.ADMIN), (req, res) =>
  restaurantController.delete(req, res)
);

export default restaurantRoutes;
