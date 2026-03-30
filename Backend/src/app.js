import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoutes from "./routes/health.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import visionRoutes from "./routes/vision.routes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
    const app = express();

    app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use(morgan("dev"));

    app.use("/api", healthRoutes);
    app.use("/api", chatbotRoutes);
    app.use("/api", visionRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}