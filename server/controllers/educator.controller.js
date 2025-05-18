import { clerkClient } from "@clerk/express";
import Course from "../models/Course.model.js";
import Purchase from "../models/Purchase.model.js";
import cloudinary from "../configs/cloudinary.config.js";

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

// TO ADD A NEW COURSE
export const addCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Thumbnail not attached" });
    }

    if (!courseData || !educatorId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    console.log("Raw courseData:", req.body.courseData);

    let parsedCourseData = courseData;
    console.log("parsedCourseData", parsedCourseData);
    const { courseTitle, courseDescription, coursePrice, discount } =
      parsedCourseData;

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
    if (typeof courseData === "string") {
      parsedCourseData = JSON.parse(courseData);
    }

    parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();
    res
      .status(200)
      .json({ success: true, message: "Course created successfully" });
  } catch (error) {
    console.error("Course creation failed:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// GET EDUCATOR COURSES
const getEducatorCourses = async () => {
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
export const educatorDashboardData = async () => {
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
export const getEnrolledStudentsData = async () => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
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
