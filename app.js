const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { APIlimiter } = require("./helpers/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use("/api/", rateLimit(APIlimiter));

app.use("/api/", require("./routes/api"));

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});

module.exports = app;
