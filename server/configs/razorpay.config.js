import razorpay from "razorpay";
import "dotenv/config";

export const createRazorpayInstance = () => {
  // console.log("Id :", process.env.RAZORPAY_KEY_ID);
  // console.log("Secret :", process.env.RAZORPAY_KEY_SECRET);

  return new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};
