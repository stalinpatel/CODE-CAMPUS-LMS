import Course from "../models/Course.model.js";
import User from "../models/User.model.js";

// GET ALL COURSES
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("error in getAllCourses controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//GET SPECIFIC COURSE DETAILS
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = await Course.findById(id).populate({ path: "educator" });
    //remover lec url if preview is not free
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });
    return res.status(200).json({ success: true, courseData });
  } catch (error) {
    console.error("error in getCourseById controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
