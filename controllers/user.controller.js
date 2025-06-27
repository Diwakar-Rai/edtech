const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("../config/index.config.js");
const CustomError = require("../utils/customError.js");
const nodemailer = require("nodemailer");
console.log(dotenv.MY_PASSWORD);

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
    let user = await User.create(body);
    let url = `${dotenv.BASE_URL}/api/v1/auth/verify/${generateToken(
      user._id
    )}`;
    await transporter.sendMail({
      from: `My App- ${dotenv.MY_EMAIL}`,
      to: body.email,
      subject: "Verify your email",
      html: `
      
      <h1>Please verify your email by following this link</h1> <a href="${url}">Email Verification</a>`,
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
    const decoded = jwt.verify(req.params.token, dotenv.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { isVerified: true });
    res.send("Email Verified successfully");
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
