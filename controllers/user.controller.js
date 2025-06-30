const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const dotenv = require("../config/index.config.js");
const CustomError = require("../utils/customError.js");
const asyncHandler = require("../utils/async.js");

//! Function to generate token
const generateToken = id => {
  return jwt.sign({ id }, dotenv.JWT_SECRET, {
    expiresIn: dotenv.JWT_EXPIRES_IN,
  });
};
/**
 * Code for handling the email verification
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: dotenv.MY_EMAIL,
    pass: dotenv.MY_PASSWORD,
  },
});
/**
 * Function to generate OTP
 */
function generateOTP() {
  let otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

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
    let otp = generateOTP();
    let otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity
    let user = await User.create({ ...body, otp, otpExpires });

    await transporter.sendMail({
      from: `My App- ${dotenv.MY_EMAIL}`,
      to: body.email,
      subject: "Verify your email",
      html: `
      
      <h1>Please verify your email by using this OTP</h1><h2>${otp}</h2>`,
    });
    return res
      .status(201)
      .json({ message: "user created successfully", statusCode: 201 });
  } catch (error) {
    next(error);
  }
};

exports.emailVerification = async (req, res) => {
  try {
    let { email, otp } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (user.isVerified) {
      return res.json({ message: "User already verified!" });
    }
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully" });
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
