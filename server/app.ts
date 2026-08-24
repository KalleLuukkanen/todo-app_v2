import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import * as categoriesController from "./controllers/categoriesController.js";
import * as todosController from "./controllers/todosController.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

//auth
app.use(async (req, res, next) => {
    const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
    if (!session) {
        return next();
    }
    (req as any).userId = session.user.id;
    return next();
});
app.use("/api", (req, res, next) => {
    const user = (req as any).user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
});

//categories
app.get("/api/categories", categoriesController.getAll);
app.get("/api/categories/:categoryId", categoriesController.getOne);
app.post("/api/categories", categoriesController.create);
app.delete("/api/categories", categoriesController.removeAll);
app.delete("/api/categories/:categoryId", categoriesController.remove);
app.patch("/api/categories/:categoryId", categoriesController.modify);

//todos
app.get("/api/todos", todosController.getAll);
app.get("/api/todos/:todoId", todosController.getOne);
app.post("/api/todos", todosController.create);
app.delete("/api/todos", todosController.removeAll);
app.delete("/api/todos/:todoId", todosController.remove);
app.patch("/api/todos/:todoId/modify", todosController.modify);
app.patch("/api/todos/:todoId/done", todosController.completeOrUncomplete);

export default app;