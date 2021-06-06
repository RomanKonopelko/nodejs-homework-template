const express = require("express");
const ctrl = require("../../../controllers/users");

const { registerUser, loginUser, logoutUser } = ctrl;

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
