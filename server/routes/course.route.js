import express from "express";
import {
  getAllCourses,
  getCourseById,
} from "../controllers/course.controller.js";

const courseRouter = express.Router();

courseRouter.get("/all", getAllCourses); //DONE
courseRouter.get("/:id", getCourseById); //DONE

export default courseRouter;
