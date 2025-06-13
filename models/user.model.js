const { genSalt, hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

let { Schema, model } = mongoose;

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "password is required"],
      //% Makes sure that password is not returned with any response
      select: false,
    },
  },
  {
    //% Automatically adds createdAt and updated at fields in the document
    timestamps: true,
  }
);

//% hashing the password before saving in the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //% Generating 10 rounds of salting using the bcrypt library
  let salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

//% Checking the hashed password with the entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password) return false;
  let comparedPassword = await compare(enteredPassword, this.password);
  return comparedPassword;
};
module.exports = model("User", userSchema);
