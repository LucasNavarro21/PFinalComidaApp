import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAll.bind(userController));
router.post("/", userController.create.bind(userController));
router.post("/login", userController.login.bind(userController));

export default router;
