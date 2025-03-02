const Joi = require("joi");
const mangoose = require("mongoose");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
}).or("name", "phone", "email");

const schemaUpdateContactStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const isIdValid = (id) => {
  return mangoose.isValidObjectId(id);
};

const toValidate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ""),
    });
  }
};

module.exports = {
  validatedNewContact: (req, res, next) => {
    return toValidate(schemaCreateContact, req.body, next);
  },
  validatedUpdateContact: (req, res, next) => {
    return toValidate(schemaUpdateContact, req.body, next);
  },
  validatedUpdateContactStatus: (req, res, next) => {
    return toValidate(schemaUpdateContactStatus, req.body, next);
  },
  validatedContactId: (req, res, next) => {
    if (!isIdValid(req.params.contactId)) {
      return next({
        status: 400,
        message: "invalid ID",
      });
    }
    next();
  },
};
