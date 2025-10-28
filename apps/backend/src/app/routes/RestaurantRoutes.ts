import { Router } from "express";
import { restaurantController } from "../controllers/RestaurantController.js";

const restaurantRoutes = Router();

restaurantRoutes.get("/", restaurantController.getAll);
restaurantRoutes.get("/:id", restaurantController.getById);
restaurantRoutes.post("/", restaurantController.create);
restaurantRoutes.put("/:id", restaurantController.update);
restaurantRoutes.delete("/:id", restaurantController.delete);

export default restaurantRoutes;
