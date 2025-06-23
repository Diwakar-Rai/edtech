const asyncHandler = require("../utils/async.js");
const bootcampModel = require("../models/bootcamp.model.js");
const CustomError = require("../utils/customError.js");
const coursesModel = require("../models/courses.model");
/**
 * Function to creat a course
 * @METHOD POST
 * @ACCESS PRIVATE
 * @API /api/v1/course
 */

const createCourse = asyncHandler(async (req, res, next) => {
  let id = req.body.bootcampId;
  let bootcamp = await bootcampModel.findById(id);
  if (!bootcamp) {
    next(new CustomError("No such bootcamp found!", 404));
  }

  let course = await coursesModel.create(req.body);
  res
    .status(201)
    .json({ message: "Successfully Course Created", data: course });
});

/**
 * Function to get all the courses
 *@METHOD GET
 *@ACCESS PUBLIC
 *@API /api/v1/course
 */

const allCourses = asyncHandler(async (req, res, next) => {
  let courses = await coursesModel.find();
  res.status(200).json({ message: "List of all the courses", data: courses });
});

/**
 * Function to get a single course
 * @METHOD GET
 * @ACCESS PUBLIC
 * @API /api/v1/course/:id
 */

const getSingleCourse = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let course = await coursesModel.findById(id);
  res.status(200).json({ message: "Found the course", data: course });
});

/**
 * Function to update a course
 * @METHOD PUT
 * @ACCESS PRIVATE
 * @API /api/v1/course/:id
 */

const updateCourse = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let update = await coursesModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res
    .status(200)
    .json({ message: "Course updated successfully", data: update });
});

/**
 * Function to delete a course
 * @METHOD DELETE
 * @ACCESS PRIVATE
 * @API /api/v1/course
 */
const deleteCourse = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  await coursesModel.findByIdAndDelete(id);
  res.status(200).json({ message: "course deleted successfully" });
});
module.exports = {
  createCourse,
  allCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
