import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.controller.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json()); // default parser

app.post("/clerk", express.raw({ type: "*/*" }), clerkWebhooks);
app.get("/", (req, res) => res.send("API working"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

// fix mongodb uri not gettin conected
