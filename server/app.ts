import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "hello world" });
});

export default app;