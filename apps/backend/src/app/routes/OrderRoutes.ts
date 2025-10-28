import { Router } from "express";
import { OrderController } from "../controllers/OrderController.js";

const router = Router();
const orderController = new OrderController();

router.post("/", (req, res) => orderController.create(req, res));

router.get("/", (req, res) => orderController.getAll(req, res));

router.get("/:id", (req, res) => orderController.getById(req, res));

router.put("/:id", (req, res) => orderController.update(req, res));

router.delete("/:id", (req, res) => orderController.delete(req, res));

export default router;
