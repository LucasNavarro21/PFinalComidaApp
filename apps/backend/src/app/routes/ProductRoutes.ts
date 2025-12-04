import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UserRole } from "@domain/entities/User.js";

const router = Router();
const controller = new ProductController();

router.get("/", (req, res) => controller.getAll(req, res));

router.get("/:id", (req, res) => controller.getById(req, res));

// RESTAURANT_OWNER y ADMIN pueden crear productos (ADMIN es superior en jerarquía)
router.post("/", authMiddleware(UserRole.RESTAURANT_OWNER), (req, res) => controller.create(req, res));

// RESTAURANT_OWNER y ADMIN pueden actualizar productos
router.put("/:id", authMiddleware(UserRole.RESTAURANT_OWNER), (req, res) => controller.update(req, res));

// RESTAURANT_OWNER y ADMIN pueden eliminar productos
router.delete("/:id", authMiddleware(UserRole.RESTAURANT_OWNER), (req, res) => controller.delete(req, res));

export default router;
