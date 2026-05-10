import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import { corsMiddleware } from "./middlewares/cors.middleware";
import authRoute from "./routes/auth.route";
import profileRoute from "./routes/profile.route";
import categoryRoute from "./routes/category.route";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(corsMiddleware);
app.use(morgan("tiny"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/categories", categoryRoute);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running with port: ${PORT}`);
});
