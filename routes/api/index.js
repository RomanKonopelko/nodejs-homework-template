const express = require("express");
const router = express.Router();

const contactsRouter = require("./contacts");
const usersRouter = require("./users");

router.use("/users", usersRouter);
router.use("/contacts", contactsRouter);

module.exports = router;
