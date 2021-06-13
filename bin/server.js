const app = require("../app");
const db = require("../model/db");
const createFolderIsNotExist = require("../helpers/create-folder");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const USER_AVATAR = process.env.USER_AVATAR;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(USER_AVATAR);

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => console.log(`Error ${err.message}`));
