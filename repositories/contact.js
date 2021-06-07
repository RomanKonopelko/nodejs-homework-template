const Contact = require("../model/contactsScheme");

const getAllContacts = async (userId) => {
  const result = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "email,subscription -_id",
  });
  return result;
};

const getContactById = async (userId, id) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "email,subscription -_id",
  });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contact.findOneAndRemove({ _id: id, owner: userId });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body });
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contact.findByOneAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
