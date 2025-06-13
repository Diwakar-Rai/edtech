const Router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const { jwtVerify } = require("../middlewares/protect.js");
const {
  registerValidatorRules,
  loginValidatorRules,
} = require("../middlewares/userValidator.js");
const { validate } = require("../middlewares/validate.js");
const { createUser, loginUser, getMe, getAllUser, getSingleUser } =
  userController;

Router.post("/user", registerValidatorRules(), validate, createUser);
Router.post("/login", loginValidatorRules(), validate, loginUser);
Router.get("/user", jwtVerify, getMe);
Router.get("/allUser", getAllUser);
Router.get("/singleUser/:id", getSingleUser);

module.exports = Router;
