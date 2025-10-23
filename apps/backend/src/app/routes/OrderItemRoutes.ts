import { Router } from "express";
import { OrderItemController } from "../controllers/OrderItemController.js";

const router = Router();
const controller = new OrderItemController();

router.post("/", controller.create.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.get("/:orderId", controller.getByOrderId.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
