const Contacts = require("../repositories/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAllContacts();
    return res.json({ status: "success", code: 200, payload: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.status(201).json({ status: "success", code: 201, payload: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contacts = await Contacts.addContact(req.body);
    return res.status(201).json({ status: "success", code: 201, payload: { contacts } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(200).json({ status: "success", code: 200, message: "Contact deleted", payload: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body);
    if (Object.keys(req.body).length === 0)
      res.status(404).json({ status: "error", code: 404, message: "Missing fields" });
    if (contact) res.status(201).json({ status: "success", code: 201, payload: { contact } });
    return res.json({ status: "error", code: 404, message: "Contact not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllContacts, getContactById, addContact, removeContact, updateContact };
