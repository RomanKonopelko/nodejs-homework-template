const Contacts = require("../repositories/contact");
const { HTTP_CODES, HTTP_MESSAGES } = require("../helpers/constants");

const { OK, NOT_FOUND, CREATED } = HTTP_CODES;
const { NOT_FOUND_MSG, SUCCESS, DELETED, MISSING_FIELDS, ERROR } = HTTP_MESSAGES;

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.getAllContacts(userId);
    return res.json({ status: SUCCESS, code: OK, payload: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.status(CREATED).json({ status: SUCCESS, code: CREATED, payload: { contact } });
    }
    return res.json({ status: ERROR, code: NOT_FOUND, message: NOT_FOUND_MSG });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.addContact({ ...req.body, owner: userId });
    return res.status(CREATED).json({ status: SUCCESS, code: CREATED, payload: { contacts } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.status(OK).json({ status: SUCCESS, code: OK, message: DELETED, payload: { contact } });
    }
    return res.json({ status: ERROR, code: NOT_FOUND, message: NOT_FOUND_MSG });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(userId, req.params.contactId, req.body);
    if (Object.keys(req.body).length === 0)
      res.status(NOT_FOUND).json({ status: ERROR, code: NOT_FOUND, message: MISSING_FIELDS });
    if (contact) res.status(CREATED).json({ status: SUCCESS, code: CREATED, payload: { contact } });
    return res.json({ status: ERROR, code: NOT_FOUND, message: NOT_FOUND_MSG });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllContacts, getContactById, addContact, removeContact, updateContact };
