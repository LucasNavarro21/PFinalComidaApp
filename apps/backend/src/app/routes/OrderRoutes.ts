import { Router } from "express";
import { OrderController } from "../controllers/OrderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UserRole } from "@domain/entities/User.js";

const router = Router();
const orderController = new OrderController();

router.post("/", authMiddleware(), (req, res) => orderController.create(req, res));

router.get("/", authMiddleware(), (req, res) => orderController.getAll(req, res));

router.get("/:id", authMiddleware(), (req, res) => orderController.getById(req, res));

router.put("/:id", authMiddleware(), (req, res) => orderController.update(req, res));

router.delete("/:id", authMiddleware(UserRole.ADMIN), (req, res) => orderController.delete(req, res));

export default router;
