import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AccessProtectedFeature } from "@domain/use-cases/AccessProtectedFeature.js";
import { UserRole } from "@domain/entities/User.js"; 

dotenv.config();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

export const authMiddleware = (requiredRole?: UserRole) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
      }

      const token = authHeader.split(" ")[1];
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET no configurado en el .env");
      }

      const decoded = jwt.verify(token, secret) as { id: string; role: string };

      if (!Object.values(UserRole).includes(decoded.role as UserRole)) {
        return res.status(401).json({ message: "Rol inválido en el token" });
      }

      req.user = { id: decoded.id, role: decoded.role as UserRole };

      if (requiredRole) {
        const canAccess = await AccessProtectedFeature.execute(
          req.user.role,
          requiredRole
        );

        if (!canAccess) {
          return res
            .status(403)
            .json({ message: "No autorizado para acceder a esta función" });
        }
      }

      next();
    } catch (error) {
      console.error("❌ Error en authMiddleware:", error);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
};
