import { clerkClient } from "@clerk/express";

const protectEducator = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);

    const role = user?.publicMetadata?.role;

    if (role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Educator role required",
      });
    }

    next();
  } catch (error) {
    console.error("protectEducator middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default protectEducator;
