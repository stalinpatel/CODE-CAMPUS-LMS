import Course from "../models/Course.model.js";

// GET ALL COURSES
export const getAllCourses = async (req, res) => {
  try {
    console.log("get all courses hitted");
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("error in getAllCourses controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
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
    console.error("error in getAllCourses controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const asdf3 = async () => {
  try {
  } catch (error) {
    console.error("error in getAllCourses controller", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
