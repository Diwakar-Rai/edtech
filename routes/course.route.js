const Router = require("express").Router({ mergeParams: true });
const authorize = require("../utils/authorize");
const { jwtVerify } = require("../middlewares/protect.js");
const {
  createCourse,
  allCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller.js");
Router.post("/", jwtVerify, authorize("admin", "publisher"), createCourse);
Router.get("/", jwtVerify, allCourses);
Router.get("/:id", jwtVerify, getSingleCourse);
Router.put("/:id", jwtVerify, authorize("admin", "publisher"), updateCourse);
Router.delete("/:id", jwtVerify, authorize("admin", "publisher"), deleteCourse);
module.exports = Router;
