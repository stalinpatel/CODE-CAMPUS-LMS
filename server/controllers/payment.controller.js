import { createRazorpayInstance } from "../configs/razorpay.config.js";
import Course from "../models/Course.model.js";
import Purchase from "../models/Purchase.model.js";
import crypto from "crypto";
import User from "../models/User.model.js";
const secret = process.env.RAZORPAY_KEY_SECRET;
if (!secret) {
  throw new Error(
    "RAZORPAY_KEY_SECRET is not defined in environment variables."
  );
}
const razorpayInstance = createRazorpayInstance();

const createOrderInDB = async (orderData) => {
  try {
    return await Purchase.create(orderData);
  } catch (error) {
    console.error("Error creating order in DB:", error);
    throw new Error("Failed to create order in database.");
  }
};
const saveEnrollments = async (userId, courseId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    });
    return;
  } catch (error) {
    console.error("Error saveEnrollments in DB:", error);
    throw new Error("Failed to save Enrollments in database.");
  }
};

export const verifySignature = (orderId, paymentId, signature) => {
  try {
    const body = `${orderId}|${paymentId}`;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(body);
    const expectedSignature = hmac.digest("hex");
    return expectedSignature === signature;
  } catch (error) {
    console.error("Error verifying signature:", error);
    throw new Error("Failed to verify Razorpay signature.");
  }
};

export const createOrder = async (req, res) => {
  try {
    const { id: courseId } = req.body;
    const userId = req.auth.userId;

    if (!courseId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already Enrolled" });
    }

    const discountAmount = course.coursePrice * (course.discount / 100);
    const amount = course.coursePrice - discountAmount;
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        purpose: "CodeCampus Checkout",
        courseId: course._id.toString(),
        userId: user._id.toString(),
        userEmail: user.email,
      },
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({ order, success: true });
    // return res
    //   .status(500)
    //   .json({ success: false, message: "Simulated order creation failure" });
  } catch (error) {
    console.log("Error in createOrder controller ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error.toString(),
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { response, orderDescription } = req.body;

    if (!response || !orderDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Missing response or order details" });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;
    const { receiptId, amountInPaise, courseId } = orderDescription;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete payment details" });
    }
    const userId = req.auth.userId;

    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }
    const order = await createOrderInDB({
      courseId,
      userId,
      amount: Number((amountInPaise / 100).toFixed(2)),
      status: "completed",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      receiptId,
    });

    await saveEnrollments(userId, courseId);

    return res.status(200).json({
      order: {
        orderId: order.razorpayOrderId,
        receiptId: order.receiptId,
        amount: order.amount.toFixed(2),
        status: order.status,
        paidAt: order.createdAt,
      },
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    console.log("Error in verifyPayment controller ", error);
    return res.status(500).json({ message: "Internal Server Error" + error });
  }
};
