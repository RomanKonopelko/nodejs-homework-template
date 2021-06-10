const Contact = require("../model/contactsScheme");

const getAllContacts = async (userId, query) => {
  const { sortBy, sortByDesc, filter, favorite = null, limit = 5, offset = 0 } = query;
  const optionsSearch = { owner: userId };
  if (favorite !== null) optionsSearch.favorite = favorite;

  const result = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: { ...(sortBy ? { [`${sortBy}`]: 1 } : {}), ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}) },
    select: filter ? filter.split("|").join(" ") : "",
    populate: { path: "owner", select: "email, subscription" },
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
  const result = await Contact.findOneAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
