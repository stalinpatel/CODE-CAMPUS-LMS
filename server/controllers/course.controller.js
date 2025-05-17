import Course from "../models/Course.model.js";

// GET ALL COURSES
export const getAllCourses = async () => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("error in getAllCourses controller", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getCourseById = async () => {
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
    res.status(200).json({ success: true, courseData });
  } catch (error) {
    console.error("error in getAllCourses controller", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const asdf3 = async () => {
  try {
  } catch (error) {
    console.error("error in getAllCourses controller", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
