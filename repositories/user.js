const User = require("../model/userScheme");

const findById = async (id) => await User.findById(id);

const findByEmail = async (email) => await User.findOne({ email });

const create = async (body) => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar });
};

module.exports = { findByEmail, findById, create, updateToken, updateAvatar };
