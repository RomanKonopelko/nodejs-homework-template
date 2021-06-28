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
  TOO_MANY_REQUESTS: 429,
};

const HTTP_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",
  ERROR: "Error",
  NOT_FOUND_MSG: "Not found",
  SUCCESS: "Success",
  DELETED: "deleted successfully!",
  MISSING_FIELDS: "Missing required fields",
  EMAIL_IS_USED: "This email is already in use!",
  TOO_MANY_REQUESTS_MSG: "Too many requests. Please, try again later!",
};

const APIlimiter = {
  windowsMs: 15 * 60 * 1000,
  max: 1000,
  handler: (req, res, next) => {
    return res.status(UNAUTHORIZED).json({
      status: HTTP_MESSAGES.ERROR,
      code: HTTP_CODES.TOO_MANY_REQUESTS,
      message: HTTP_MESSAGES.TOO_MANY_REQUESTS_MSG,
    });
  },
};

module.exports = { SUBSCRIPTIONS, HTTP_CODES, HTTP_MESSAGES, APIlimiter };
