import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", createOrder); //DONE
paymentRouter.post("/verify-payment", verifyPayment); //DONE

export default paymentRouter;
