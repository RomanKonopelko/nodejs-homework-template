const express = require("express");
const guard = require("../../../helpers/guard");

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../../controllers/contacts");

const router = express.Router();

const {
  validatedNewContact,
  validatedUpdateContact,
  validatedUpdateContactStatus,
  validatedContactId,
} = require("./validation");

router.get("/", guard, getAllContacts);

router.post("/", guard, validatedNewContact, addContact);

router.get("/:contactId", guard, validatedContactId, getContactById);

router.delete("/:contactId", guard, validatedContactId, removeContact);

router.put("/:contactId", guard, validatedContactId, validatedUpdateContact, updateContact);

router.patch("/:contactId/favorite", guard, validatedContactId, validatedUpdateContactStatus, updateContact);

module.exports = router;
