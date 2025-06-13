const mongoose = require("mongoose");

async function connectDatabase(url) {
  try {
    await mongoose.connect(url);
    console.log(
      `MongoDb Connected:  MongoDB connected: ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
