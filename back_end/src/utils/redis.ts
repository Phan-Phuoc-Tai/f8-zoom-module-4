import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6388",
}).on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();
