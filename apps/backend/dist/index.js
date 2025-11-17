import "reflect-metadata";
import { createServer } from "./app/server.js";
const PORT = process.env.PORT || 3000;
createServer().then((app) => {
    app.listen(PORT, () => {
        console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
});
