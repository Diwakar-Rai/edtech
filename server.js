// !Third Party modules
const express = require("express");
const cors = require("cors");
const passport = require("passport");

// !Custom modules
require("./config/passport.js");
const connectDatabase = require("./config/db.config.js");
const errorHandler = require("./middlewares/errorHandler.js");
const envConfig = require("./config/index.config.js");
const userRoutes = require("./routes/user.routes.js");
const bootcampRoutes = require("./routes/bootcamp.routes.js");
const courseRoutes = require("./routes/course.route.js");
const googleRoutes = require("./routes/googleAuth.js");

//% Destructuring the env
const { PORT, MONGO_URL } = envConfig;

//% Invoking express to create an instance of express application
const app = express();

//% Parsing the body of the request object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//%Handling the CORS
app.use(cors());

//% Using the passport js for google
app.use(passport.initialize());

//% Creating the routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/bootcamp", bootcampRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1", googleRoutes);

//% Centralized error handling
app.use(errorHandler);

//% Function to start the server
const startServer = async () => {
  try {
    //% starting the database server
    await connectDatabase(MONGO_URL);
    //% Listening to the server
    let server = app.listen(PORT, () => {
      console.log("server running on PORT ", PORT);
    });

    //% Handling the error received while listening
    server.on("error", err => {
      console.log("Received some error, ", err.message);
    });
  } catch (error) {
    console.log("Some error occured", error.message);
    //# Optional
    process.exit(1);
  }
};

//% starting the server
startServer();
