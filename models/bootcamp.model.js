const { model, Schema } = require("mongoose");

const bootcampSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [50, "Name cannot have more than 30 characters."],
  },
  description: {
    type: String,
    maxlength: [500, "Description should not be more than 500 characters."],
    required: [true, "Description is required"],
  },
  careers: {
    type: [String],
    enum: [
      "web development",
      "react development",
      "fullstack development",
      "java development",
      "python development",
      "android development",
      "ux/ui development",
      "business",
      "others",
    ],
    required: true,
  },
  averageCost: Number,
  averageRating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [5, "Rating cannot be more than 5"],
  },
  photo: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2024/07/20/17/12/warning-8908707_1280.png",
  },
});

//% cascading delete for the orphaned courses
bootcampSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await doc.model("Courses").deleteMany({ bootcamp: this._id });
  }
});
module.exports = model("Bootcamps", bootcampSchema);
