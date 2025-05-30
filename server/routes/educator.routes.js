import express from "express";
import {
  addCourse,
  updateRoleEducator,
  getEducatorCourses,
  educatorDashboardData,
  getEnrolledStudentsData,
  toggleCoursePublish,
} from "../controllers/educator.controller.js";
import upload from "../configs/multer.config.js";
import protectEducator from "../middlewares/auth.middleware.js";

const educatorRouter = express.Router();

// ADD EDUCATOR ROLE
educatorRouter.get("/update-role", updateRoleEducator); //DONE
educatorRouter.post(
  "/add-course",
  protectEducator,
  upload.single("courseThumbnail"),
  addCourse
); //DONE
educatorRouter.get("/courses", protectEducator, getEducatorCourses); //DONE
educatorRouter.get("/dashboard", protectEducator, educatorDashboardData); //DONE
educatorRouter.patch(
  "/toggle-publish/:id",
  protectEducator,
  toggleCoursePublish
); //DONE
educatorRouter.get(
  "/enrolled-students",
  protectEducator,
  getEnrolledStudentsData
); //DONE

export default educatorRouter;
