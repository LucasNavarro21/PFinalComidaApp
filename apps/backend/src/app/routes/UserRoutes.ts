import { Router } from "express";
import { userController } from "../controllers/UserController.js";

const router = Router();

router.get("/", userController.list); 
router.post("/register", userController.register); 
router.post("/login", userController.login);
router.get("/profile", userController.profile); 
router.delete("/:id", userController.delete); 

export default router;





