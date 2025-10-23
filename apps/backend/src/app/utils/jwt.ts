import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secreto-super-seguro";

export function generarToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
}

export function verificarToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}
