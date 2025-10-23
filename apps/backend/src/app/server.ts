import "reflect-metadata";
import { AppDataSource } from "../app/infra/db/data-source";
import express from "express";
import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductRoutes";
import restaurantRoutes from "./routes/RestaurantRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import orderItemRoutes from "./routes/OrderItemRoutes";

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
