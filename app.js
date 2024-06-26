import express from "express"
import cors from "cors"
import { usuariosRouter } from "./routers/usuarios.routes.js";

const app = express(); // incializo una app express
app.use(express.json());
const corsOptions = {
    origin: '*', // '*' para permitir desde cualquier origen
};

app.use(cors(corsOptions)); // declaro politicas de cors

// definir entrada a enpoints de usuarios
app.use("/usuarios", usuariosRouter.router)

export default app