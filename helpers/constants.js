const SUBSCRIPTIONS = {
  BUISNESS: "buisness",
  STARTER: "starter",
  PRO: "pro",
};

const HTTP_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const HTTP_MESSAGES = {
  ERROR = "Error",
    NOT_FOUND_MSG = 'Not found',
    SUCCESS: 'Succsess',
    DELETED: 'deleted successfully!',
    MISSING_FIELDS: 'Missing requiered fileds',

}

module.exports = { SUBSCRIPTIONS, HTTP_CODES, HTTP_MESSAGES };
