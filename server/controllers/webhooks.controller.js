import { Webhook } from "svix";
import User from "../models/User.model";

// API CONTROLLER FUNCTION TO MANAGE CLERK USER WITH DATABASE

export const clerkWebhooks = async (req, res) => {
  try {
    // ✅ CREATE SVIX WEBHOOK INSTANCE USING SECRET
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ GET RAW PAYLOAD AS BUFFER (FROM express.raw())
    const payload = req.body;

    // ✅ CONVERT BUFFER TO STRING FOR VERIFICATION
    const bodyStr = payload.toString();

    // ✅ EXTRACT SVIX SIGNATURE HEADERS
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    };

    // ✅ VERIFY WEBHOOK SIGNATURE USING SVIX
    await whook.verify(bodyStr, headers);

    // ✅ PARSE JSON BODY AFTER VERIFICATION (NEVER BEFORE)
    const parsedBody = JSON.parse(bodyStr);
    const { data, type } = parsedBody;

    // ✅ HANDLE EVENTS BASED ON TYPE
    switch (type) {
      case "user.created": {
        // ✅ STRUCTURE USER DATA FROM CLERK
        const userData = {
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        };

        // ✅ INSERT USER INTO DB
        await User.create(userData);

        // ✅ SEND 200 RESPONSE TO CLERK (MUST)
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const userData = {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        };

        // ✅ UPDATE USER IN DB
        await User.findByIdAndUpdate(data.id, userData);

        // ✅ ACKNOWLEDGE TO CLERK
        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        // ✅ DELETE USER FROM DB
        await User.findByIdAndDelete(data.id);

        // ✅ ACKNOWLEDGE TO CLERK
        return res.status(200).json({ success: true });
      }

      default:
        // ⚠️ HANDLE UNREGISTERED EVENTS (OPTIONAL)
        console.log(`UNHANDLED EVENT TYPE: ${type}`);
        return res.status(200).json({ success: true });
    }
  } catch (error) {
    // ❌ CATCH ALL ERRORS: SIGNATURE FAIL, DB FAIL, ETC.
    console.error("❌ CLERK WEBHOOK ERROR:", {
      message: error.message,
      stack: error.stack,
      headers: req.headers,
      body: req.body?.toString?.() ?? req.body,
    });

    // ❌ RETURN 400 SO CLERK CAN RETRY IF NEEDED
    return res.status(400).json({
      success: false,
      message: "WEBHOOK FAILED",
      error: error.message,
    });
  }
};
