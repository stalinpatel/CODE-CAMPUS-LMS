import { clerkClient } from "@clerk/express";
import Course from "../models/Course.model.js";
import User from "../models/User.model.js";
import Purchase from "../models/Purchase.model.js";
import cloudinary from "../configs/cloudinary.config.js";
import fs from "fs/promises";

const uploadImageHelper = async (local_path) => {
  try {
    const imageUpload = await cloudinary.uploader.upload(local_path);
    // After successful upload
    await fs.unlink(local_path);
    return imageUpload.secure_url;
  } catch (error) {
    console.log("❌ Image upload failed:", error);
    throw new Error("Image upload to Cloudinary failed.");
  }
};

const inputChecks = (courseThumbnail, courseData, educatorId) => {
  if (!courseThumbnail) {
    throw new Error("Thumbnail not attached");
  }

  if (!courseData || !educatorId) {
    throw new Error("All fields are required");
  }
};

// TO ADD A NEW COURSE
export const addCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const courseThumbnail = req.file;
    const educatorId = req.auth.userId;

    inputChecks(courseThumbnail, courseData, educatorId);

    let parsedCourseData = courseData;

    // parse main body if needed
    if (typeof courseData === "string") {
      parsedCourseData = JSON.parse(courseData);
    }

    // Clean the weird prototype
    parsedCourseData = { ...parsedCourseData };

    // Parse courseContent separately
    if (typeof parsedCourseData.courseContent === "string") {
      parsedCourseData.courseContent = JSON.parse(
        parsedCourseData.courseContent
      );
    }

    parsedCourseData.educator = educatorId;

    const {
      courseTitle,
      courseDescription,
      courseContent, //start from here ,convert to normal object -stringified
      coursePrice,
      discount,
    } = parsedCourseData;

    if (
      !courseTitle ||
      !courseDescription ||
      !coursePrice ||
      discount == null
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    const image_url = await uploadImageHelper(courseThumbnail.path);

    const newCourse = await Course.create({
      courseTitle,
      courseDescription,
      courseThumbnail: image_url,
      coursePrice,
      discount,
      courseContent,
      educator: educatorId,
    });

    console.log("Course created successfully");
    return res
      .status(200)
      .json({ success: true, message: "Course created successfully" });
  } catch (error) {
    console.error("Course creation failed:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE ROLE TO EDUCATOR
export const updateRoleEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res
      .status(200)
      .json({ success: true, message: "You can publish a  course now" });
  } catch (error) {
    console.error("Clerk role update failed:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
// GET EDUCATOR COURSES
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("error in getEducatorCourses controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//GET EDUCATOR DASHBORD DATA
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    // CALCULATE TOTAL EARNING  FROM PURCHASES
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );
    //COLLECT STUDENT IDS WITH THEIR COURSE TITLES
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );
      students.forEach((students) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          students,
        });
      });
    }
    return res.status(200).json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    console.error("error in educatorDashboardData controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//GET ENROLLED STUDENTS DATA WITH PURCHASE DATA
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });

    if (!courses.length)
      return res.status(200).json({ success: true, enrolledStudents: [] });

    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));
    return res.status(200).json({ success: true, enrolledStudents });
  } catch (error) {
    console.error("error in getEnrolledStudentsData controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
