import express from "express";
import {
  addUserRating,
  markUserCourseProgress,
  unmarkUserCourseProgress,
  getUserData,
  getUserCourseProgress,
  userEnrolledCourses,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData); //DONE
userRouter.get("/enrolled-courses", userEnrolledCourses); //DONE
userRouter.post("/mark-course-progress", markUserCourseProgress); //DONE
userRouter.post("/unmark-course-progress", unmarkUserCourseProgress); //DONE
userRouter.post("/get-course-progress", getUserCourseProgress); //DONE
userRouter.post("/add-rating", addUserRating); //DONE

export default userRouter;
