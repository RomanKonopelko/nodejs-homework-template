const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const { APIlimiter } = require("./helpers/constants");
require("dotenv").config();
const USER_AVATAR = process.env.USER_AVATAR;
const PUBLIC_DIR = process.env.PUBLIC_DIR;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json({ limit: 10000 }));

app.use("/api/", rateLimit(APIlimiter));

app.use("/api/", require("./routes/api"));

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(500).json({ status: status === 500 ? "fail" : "error", code: 500, message: err.message });
});

module.exports = app;
