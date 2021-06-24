const express = require("express");
const ctrl = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

const { registerUser, loginUser, logoutUser, getCurrentUserData, uploadAvatar } = ctrl;

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/current", guard, getCurrentUserData);
router.patch("/avatars", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:token", ctrl.verify);
router.post("/verify", ctrl.repeatEmailVerification);

module.exports = router;
