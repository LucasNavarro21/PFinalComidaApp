import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mi_super_clave_secreta_123";
console.log("🔐 SECRET_KEY usada en utils:", SECRET_KEY);

export function generarToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
}

export function verificarToken(token: string) {
  console.log("🛡️ Verificando token con SECRET_KEY:", SECRET_KEY);
  return jwt.verify(token, SECRET_KEY);
}
