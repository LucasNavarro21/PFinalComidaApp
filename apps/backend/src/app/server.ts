import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "../app/infra/db/data-source.js";
import express from "express";
import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import restaurantRoutes from "./routes/RestaurantRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import orderItemRoutes from "./routes/OrderItemRoutes.js";
import cors from "cors";


export async function createServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());




  await AppDataSource.initialize()
    .then(() => {
      console.log("Conexion lograda con PostgreSql");
    })
    .catch((err) => {
      console.error("Error de conexion a la bd:", err);
    });

      app.use("/users", userRoutes);
      app.use("/products", productRoutes);
      app.use("/restaurants", restaurantRoutes);
      app.use("/orders", orderRoutes);
      app.use("/order-items", orderItemRoutes);

  app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
  });

  return app;
}


