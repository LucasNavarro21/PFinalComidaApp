import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UserRole } from "../../../../../domain/src/entities/User.js";

const restaurantRoutes = Router();

restaurantRoutes.get("/", (req, res) => restaurantController.getAll(req, res));

restaurantRoutes.get("/:id", (req, res) => restaurantController.getById(req, res));

restaurantRoutes.post("/", authMiddleware(UserRole.RESTAURANT_OWNER), (req, res) =>
  restaurantController.create(req, res)
);

restaurantRoutes.put("/:id", authMiddleware(UserRole.RESTAURANT_OWNER), (req, res) =>
  restaurantController.update(req, res)
);

restaurantRoutes.delete("/:id", authMiddleware(UserRole.ADMIN), (req, res) =>
  restaurantController.delete(req, res)
);

export default restaurantRoutes;
