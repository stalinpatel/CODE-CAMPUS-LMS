import Course from "../models/Course.model.js";
import CourseProgress from "../models/CourseProgress.model.js";
import User from "../models/User.model.js";

//GET USER DATA
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("error in getUserData controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//USER ENROLLED COURSES WITH LECTURE LINKS
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");
    return res
      .status(200)
      .json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    console.error("error in userEnrolledCourses controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//UPDATE USERCOURSE PROGRESS
export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    console.log("courseId", courseId);
    console.log("lectureId", lectureId);

    const progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res
          .status(200)
          .json({ success: true, message: "Lecture already completed" });
      }
      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }
    return res.status(200).json({ success: true, message: "Progress Updated" });
  } catch (error) {
    console.error("error in updateUserCourseProgress controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//GET COURSE PROGRESS OF USER
export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    return res.status(200).json({ success: false, progressData });
  } catch (error) {
    console.error("error in getUserCourseProgress controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//ADD USER RATING TO COURSE
export const addUserRating = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Details" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(200)
        .json({ success: false, message: "Course Not Found" });
    }
    const user = await User.findById(userId);

    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.status(200).json({
        success: false,
        message: "User has not purchased this course",
      });
    }
    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId === userId
    );
    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }
    await course.save();
    return res.status(200).json({ success: true, message: "Raing added" });
  } catch (error) {
    console.error("error in addUserRating controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
