const Router = require("express").Router();
const {
  createBootcamp,
  getAllBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamp.controller.js");
const { jwtVerify } = require("../middlewares/protect.js");
const authorize = require("../utils/authorize.js");

Router.post("/", jwtVerify, authorize("admin", "publisher"), createBootcamp);
Router.get("/", jwtVerify, getAllBootcamp);
Router.get("/:id", jwtVerify, getSingleBootcamp);
Router.put("/:id", jwtVerify, authorize("admin", "publisher"), updateBootcamp);
Router.delete(
  "/:id",
  jwtVerify,
  authorize("admin", "publisher"),
  deleteBootcamp
);
module.exports = Router;
