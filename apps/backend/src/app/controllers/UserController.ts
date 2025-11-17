import { Request, Response } from "express";
import { RegisterUser } from "@domain/use-cases/User/RegisterUser.js";
import { LoginUser } from "@domain/use-cases/User/LoginUser.js";
import { TypeOrmUserService } from "../infra/repositories/TypeOrmUserService.js";
import { generarToken, verificarToken } from "@domain/utils/types/jwt.js";
import { AppDataSource } from "../infra/db/data-source.js";
import { UserEntity } from "../infra/db/entities/UserEntity.js";

const userRepository = AppDataSource.getRepository(UserEntity);
const userService = new TypeOrmUserService(userRepository);

const registerUser = new RegisterUser(userService);
const loginUser = new LoginUser(userService);

export const userController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    try {
      const user = await registerUser.execute({ name, email, password, role });
      const token = generarToken({ id: user.id, role: user.role });

      res
        .cookie("token", token, { httpOnly: true })
        .status(201)
        .json({ user, token });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const { user, token } = await loginUser.execute({ email, password });

      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ user, token });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

profile: async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const payload = verificarToken(token);

    const user = await userService.findById((payload as any).id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ user });
  } catch (err: any) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
},

  list: async (_req: Request, res: Response) => {
    try {
      const allUsers = await userService.findAll();
      res.status(200).json(allUsers);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await userService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
