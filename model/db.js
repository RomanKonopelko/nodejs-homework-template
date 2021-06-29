const Mongoose = require("mongoose");
require("dotenv").config();
let uriDb = null;
if (process.env.NODE_ENV === "test") {
  uriDb = process.env.URI_DB_TEST;
} else {
  uriDb = process.env.URI_DB;
}

const db = Mongoose.connect(uriDb, {
  useNewPArser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

Mongoose.connection.on("connected", () => {
  console.log("\x1b[32m", "Connection with MongoDB is opened");
});

Mongoose.connection.on("error", (err) => {
  console.log("\x1b[31m", `Error mongoose connection ${err.message}`);
});

Mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose disconnected`);
});

process.on("SIGINT", async () => {
  Mongoose.connection.close(() => {
    console.log("Connection to DB terminated");
    process.exit(1);
  });
});

module.exports = db;
