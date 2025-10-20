import "reflect-metadata";
import { AppDataSource } from "../app/infra/db/data-source";
import express from "express";

export async function createServer() {
  const app = express();
  app.use(express.json());

  await AppDataSource.initialize()
    .then(() => {
      console.log("Conexion lograda con PostgreSql");
    })
    .catch((err) => {
      console.error("Error de conexion a la bd:", err);
    });

  app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
  });

  return app;
}
