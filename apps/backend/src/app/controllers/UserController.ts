import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AppDataSource } from "../infra/db/data-source";
import { User } from "../infra/db/entities/User.entity.js";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();
      return res.json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // 🟢 Crear un nuevo usuario
async create(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Faltan campos obligatorios" });

    const existing = await this.userRepository.findOneBy({ email });
    if (existing)
      return res.status(400).json({ message: "El usuario ya existe" });

    // 🔒 Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log("Hashed password:", hashedPassword);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findOneBy({ email });
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ message: "Contraseña incorrecta" });

      return res.json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error("Error en login:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
