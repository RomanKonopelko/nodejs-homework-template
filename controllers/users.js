const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const User = require("../repositories/user");
const { HTTP_CODES, HTTP_MESSAGES } = require("../helpers/constants");
const UploadAvatarService = require("../services/__mocks__/local-upload");
const EmailService = require("../services/email");
const {} = require("../services/email-sender");
// const UploadAvatarService = require("../services/cloud-upload");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const PUBLIC_DIR = process.env.PUBLIC_DIR;
const USER_AVATAR = process.env.USER_AVATAR;

const { ERROR, SUCCESS, EMAIL_IS_USED, INVALID_CREDENTIALS } = HTTP_MESSAGES;
const { CONFLICT, CREATED, OK, UNAUTHORIZED, NO_CONTENT } = HTTP_CODES;

const registerUser = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (user) {
      return res.status(CONFLICT).json({ status: ERROR, code: CONFLICT, message: EMAIL_IS_USED });
    }
    const { id, email, subscription, avatar, verifyToken } = await User.create(req.body);
    return res.status(CREATED).json({ status: SUCCESS, code: CREATED, payload: { id, email, subscription, avatar } });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPassword || !user.isVerified) {
      return res.status(UNAUTHORIZED).json({ status: ERROR, code: CONFLICT, message: INVALID_CREDENTIALS });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await User.updateToken(id, token);
    return res.json({ status: SUCCESS, code: OK, payload: { token } });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    await User.updateToken(id, null);
    return res.status(NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const getCurrentUserData = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return await res.status(OK).json({ status: SUCCESS, code: OK, payload: { email, subscription } });
  } catch (err) {
    next(err);
  }
};
const uploadAvatar = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService(USER_AVATAR);
    const avatarUrl = await uploads.saveAvatar({ userId: id, file: req.file });
    try {
      await fs.unlink(path.join(process.env.PUBLIC_DIR, req.user.avatar));
    } catch (err) {
      console.log(err.message);
    }
    await User.updateAvatar(id, avatarUrl);
    res.json({ status: SUCCESS, code: OK, payload: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};

// const uploadAvatar = async (req, res, next) => {
//   try {
//     const id = req.user.id;
//     const uploads = new UploadAvatarService();
//     const { idCloudAvatar, avatarUrl } = await uploads.saveAvatar(req.file.path, req.user.idCloudAvatar);

//     await fs.unlink(req.file.path);
//     await User.updateAvatar(id, avatarUrl, idCloudAvatar);
//     res.json({ status: SUCCESS, code: OK, payload: { avatarUrl } });
//   } catch (error) {
//     next(error);
//   }
// };
module.exports = { registerUser, loginUser, logoutUser, getCurrentUserData, uploadAvatar };
