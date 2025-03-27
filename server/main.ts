// @ts-types="npm:@types/express@5.0.1"

import express from "express";
import { createClient } from "redis";

import authRoutes from "./routes/auth.routes.ts";

const app = express();
const port = process.env.PORT || 3001;

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

app.locals.redis = redisClient;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
