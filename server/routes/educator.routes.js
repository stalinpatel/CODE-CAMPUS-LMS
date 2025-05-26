import express from "express";
import {
  addCourse,
  updateRoleEducator,
  getEducatorCourses,
  educatorDashboardData,
  getEnrolledStudentsData,
} from "../controllers/educator.controller.js";
import upload from "../configs/multer.config.js";
import protectEducator from "../middlewares/auth.middleware.js";

const educatorRouter = express.Router();

// ADD EDUCATOR ROLE
educatorRouter.get("/update-role", updateRoleEducator);
educatorRouter.post(
  "/add-course",
  protectEducator,
  upload.single("courseThumbnail"),
  addCourse
);
educatorRouter.get("/courses", protectEducator, getEducatorCourses);
educatorRouter.get("/dashboard", protectEducator, educatorDashboardData);
educatorRouter.get(
  "/enrolled-students",
  protectEducator,
  getEnrolledStudentsData
);

export default educatorRouter;
