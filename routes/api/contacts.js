const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");

const router = express.Router();

const {
  validatedNewContact,
  validatedUpdateContact,
  validatedUpdateContactStatus,
  validatedContactId,
} = require("./validation");

router.get("/", getAllContacts);

router.post("/", validatedNewContact, addContact);

router.get("/:contactId", validatedContactId, getContactById);

router.delete("/:contactId", validatedContactId, removeContact);

router.put("/:contactId", validatedContactId, validatedUpdateContact, updateContact);

router.patch("/:contactId/favorite", validatedContactId, validatedUpdateContactStatus, updateContact);

module.exports = router;
