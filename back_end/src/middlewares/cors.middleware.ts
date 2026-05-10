import cors, { CorsOptions } from "cors";
import { CONFIG } from "../constants/config.constant";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || CONFIG.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
