import { Webhook } from "svix";
import User from "../models/User.model.js";

if (!process.env.CLERK_WEBHOOK_SECRET) {
  console.log("CLERK WEBHOOK SECRET NOT LOADED PROPERLY");
}

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = req.body;

    const bodyStr = Buffer.isBuffer(payload)
      ? payload.toString()
      : JSON.stringify(payload);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    };

    // ✅ Signature verification first — never trust without this
    await whook.verify(bodyStr, headers);

    const parsedBody = JSON.parse(bodyStr);
    const { data, type } = parsedBody;

    switch (type) {
      case "user.created": {
        console.log("user.created event received:", data);

        const userData = {
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses?.[0]?.email_address ?? null,
          imageUrl: data.image_url,
        };

        const existingUser = await User.findById(data.id);

        if (!existingUser) {
          await User.create(userData);
        } else {
          console.log("🟡 User already exists — skipping creation");
        }

        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        console.log("user.updated event received:", data);

        const userData = {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses?.[0]?.email_address ?? null,
          imageUrl: data.image_url,
        };

        const existingUser = await User.findById(data.id);

        if (existingUser) {
          await User.findByIdAndUpdate(data.id, userData, { new: true });
        } else {
          console.log("🔴 Tried to update non-existent user — skipping");
        }

        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        console.log("user.deleted event received:", data);

        const existingUser = await User.findById(data.id);

        if (existingUser) {
          await User.findByIdAndDelete(data.id);
        } else {
          console.log("⚠️ Tried to delete non-existent user — skipping");
        }

        return res.status(200).json({ success: true });
      }

      default:
        console.log(`⚠️ Unhandled event type: ${type}`);
        return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("❌ CLERK WEBHOOK ERROR:", {
      message: error.message,
      stack: error.stack,
      headers: req.headers,
      body: req.body?.toString?.() ?? req.body,
    });

    return res.status(400).json({
      success: false,
      message: "WEBHOOK FAILED",
      error: error.message,
    });
  }
};
