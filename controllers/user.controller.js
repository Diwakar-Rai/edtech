const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("../config/index.config.js");
const CustomError = require("../utils/customError.js");

//! Function to generate token
const generateToken = id => {
  console.log(id, "id");
  return jwt.sign({ id }, dotenv.JWT_SECRET, {
    expiresIn: dotenv.JWT_EXPIRES_IN,
  });
};

/**
 * Function to create a user
 * @METHOD POST
 * @ACCESS PUBLIC
 * @API /api/v1/auth/user
 *
 */
exports.createUser = async (req, res, next) => {
  try {
    let body = req.body;
    let isExisting = await User.findOne({ email: body.email });
    if (isExisting) {
      return res.status(400).json({ message: "User already exists" });
    }
    await User.create(body);
    return res
      .status(201)
      .json({ message: "user created successfully", statusCode: 201 });
  } catch (error) {
    next(error);
  }
};

/**
 * Function for handling login
 * @METHOD POST
 * @ACCESS PUBLIC
 * @API /api/v1/auth/login
 */

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user || (await user.matchPassword(password))) {
      return res.status(401).json({
        message: "User not found",
        error: "Invalid email or password",
      });
    }
    // console.log(user);
    let id = user._id.toString();
    console.log(id);
    const token = generateToken(id);
    res.status(200).json({ message: "logged in successfully", token });
  } catch (error) {
    next(error);
  }
};

/**
 * Function for giving user data
 * @METHOD GET
 * @ACCESS PRIVATE
 * @API /api/v1/auth/user
 */

exports.getMe = async (req, res, next) => {
  try {
    const id = req.user.id;
    let user = await User.findById(id).select("username role email");
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
