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

const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT TO DATABASE
await connectDB();
await connectCloudinary();

//WEBHOOK NEEDS UN-PARSED RAW REQ BODY , KEEP IT IN TOP
app.post("/clerk", express.raw({ type: "*/*" }), clerkWebhooks); //put it before the express.json()

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

//ROUTES
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

//DEFAULT ROUTE
app.get("/", (req, res) => res.send("API working"));

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

// go to add course controller
