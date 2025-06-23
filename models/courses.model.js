const { model, Schema } = require("mongoose");

const CourseModel = new Schema({
  title: {
    type: String,
    required: [true, "title is required."],
  },
  description: { type: String, required: [true, "description is required"] },
  duration: {
    type: Number,
    required: [true, "Enter the duration in number of weeks"],
  },
  price: {
    type: Number,
    required: [true, "Add the course price"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add the minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  bootcampId: { type: Schema.ObjectId, ref: "Bootcamp", required: true },
});

module.exports = model("Courses", CourseModel);
