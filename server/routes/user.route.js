import express from "express";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  updateUserCourseProgress,
  userEnrolledCourses,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCourses);
userRouter.post("update-course-progress", updateUserCourseProgress);
userRouter.post("get-course-progress", getUserCourseProgress);
userRouter.post("add-rating", addUserRating);

export default userRouter;
