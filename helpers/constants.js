const SUBSCRIPTIONS = {
  BUISNESS: "buisness",
  STARTER: "starter",
  PRO: "pro",
};

const HTTP_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const HTTP_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",
  ERROR: "Error",
  NOT_FOUND_MSG: "Not found",
  SUCCESS: "Succsess",
  DELETED: "deleted successfully!",
  MISSING_FIELDS: "Missing requiered fileds",
  EMAIL_IS_USED: "This email is already in use!",
};

module.exports = { SUBSCRIPTIONS, HTTP_CODES, HTTP_MESSAGES };
