const { body } = require("express-validator");

const passwordRules = () =>
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must have atleast 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast one lowercase alphabet")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast one uppercase alphabet")
    .matches(/[\d]/)
    .withMessage("Password must contain atleast one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain atleast one special character");

const registerValidatorRules = () => [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ max: 30, min: 3 })
    .withMessage("Length of username should between between 3-30"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email should be valid")
    .normalizeEmail(),
  passwordRules(),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
];

const loginValidatorRules = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),
  passwordRules(),
];

module.exports = { registerValidatorRules, loginValidatorRules };
