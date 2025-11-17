import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { UserRole } from "@domain/entities/User.js";

const router = Router();

router.get("/", authMiddleware(UserRole.ADMIN), (req, res) => userController.list(req, res));

router.post("/register", (req, res) => userController.register(req, res));

router.post("/login", (req, res) => userController.login(req, res));

router.get("/profile", authMiddleware(), (req, res) => userController.profile(req, res));

router.delete("/:id", authMiddleware(UserRole.ADMIN), (req, res) => userController.delete(req, res));

export default router;
