const bootcampModel = require("../models/bootcamp.model");
const asyncHandler = require("../utils/async.js");
const CustomError = require("../utils/customError.js");
/**
 * Function to create a bootcamp
 * @METHOD POST
 * @ACCESS PRIVATE
 * @API /api/v1/bootcamp
 */

const createBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await bootcampModel.create(req.body);
  res.status(201).json({ message: "Bootcamp Created", data: bootcamp });
});

/**
 * Function to get all the bootcamps
 * @METHOD GET
 * @ACCESS PUBLIC
 * @API /api/v1/bootcamp
 */

const getAllBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamps = await bootcampModel.find();
  res.status(200).json({ message: "success", data: bootcamps });
});

/**
 * Function to get a single bootcamp
 * @METHOD GET
 * @ACCESS PUBLIC
 * @API /ap1/v1/bootcamp/:id
 */

const getSingleBootcamp = asyncHandler(async (req, res, next) => {
  let id = req.params.id;

  let bootcamp = await bootcampModel.findById(id);

  res.status(200).json({ message: "success", bootcamp });
});

/**
 * Function to update the bootcamp
 * @METHOD PUT
 * @ACCESS PRIVATE
 * @API /api/v1/bootcamp/:id
 */

const updateBootcamp = asyncHandler(async (req, res, next) => {
  console.log("update");
  let id = req.params.id;
  let bootcamp = await bootcampModel.findByIdAndUpdate(id, req.body);
  if (!bootcamp) {
    return next(new CustomError("Bootcamp not found!", 404));
  }

  res.status(200).json({ message: "success", data: bootcamp });
});

/**
 * Function to delete bootcamp
 * @METHOD DELETE
 * @ACCESS PRIVATE
 * @API /api/v1/bootcamp/:id
 */

const deleteBootcamp = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let bootcamp = await bootcampModel.findById(id);
  if (!bootcamp) {
    return next(new CustomError("bootcamp not found", 404));
  }
  await bootcampModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted successfully!" });
});

module.exports = {
  createBootcamp,
  getAllBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
