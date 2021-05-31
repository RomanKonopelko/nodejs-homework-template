const Contact = require("../model/contactsScheme");

const getAllContacts = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (id) => {
  const result = await Contact.findById(id);
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(id, { ...body }, { new: true });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
