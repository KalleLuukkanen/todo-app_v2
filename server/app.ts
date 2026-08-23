import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.ts";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use(async (req, res, next) => {
    const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
    if (!session) {
        return next();
    }
    (req as any).user = session.user.name;
    return next();
});

app.use("/api", (req, res, next) => {
    const user = (req as any).user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
});

app.get("/api", (req, res) => {
    res.json({ message: "hello world" });
});

export default app;