import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UserRole } from "@domain/entities/User.js";

const router = Router();
const controller = new ProductController();

router.get("/", (req, res) => controller.getAll(req, res));

router.get("/:id", (req, res) => controller.getById(req, res));

router.post("/", authMiddleware(UserRole.ADMIN), (req, res) => controller.create(req, res));

router.put("/:id", authMiddleware(UserRole.ADMIN), (req, res) => controller.update(req, res));

router.delete("/:id", authMiddleware(UserRole.ADMIN), (req, res) => controller.delete(req, res));

export default router;
