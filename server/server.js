import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.config.js";
import { clerkWebhooks } from "./controllers/webhooks.controller.js";
import { clerkMiddleware } from "@clerk/express";
import educatorRouter from "./routes/educator.routes.js";
import courseRouter from "./routes/course.route.js";
import { connectCloudinary } from "./configs/cloudinary.config.js";
import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === "development";

const allowedOrigins = isDev
  ? ["http://localhost:5173", "http://127.0.0.1:5173"]
  : process.env.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) || [
      "https://code-campus-lms-frontend.vercel.app",
      "https://code-campus.vercel.app",
    ];

// CONNECT TO DATABASE
await connectDB();
await connectCloudinary();

//WEBHOOK NEEDS UN-PARSED RAW REQ BODY , KEEP IT IN TOP
app.post("/clerk", express.raw({ type: "*/*" }), clerkWebhooks); //put it before the express.json()

//MIDDLEWARES
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn(`Blocked by CORS: ${origin}`);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

//ROUTES
app.use("/api/educator", educatorRouter); //DONE
app.use("/api/course", courseRouter); //DONE
app.use("/api/user", userRouter); //DONE
app.use("/api/payment", paymentRouter); //DONE

//DEFAULT ROUTE
app.get("/", (req, res) => res.send("API working"));

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
