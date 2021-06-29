const guard = require("../helpers/guard");
const { HTTP_CODES, HTTP_MESSAGES } = require("../helpers/constants");
const passport = require("passport");
const { expectCt } = require("helmet");

describe("Unit test guard middleware", () => {
  const user = { token: "dfsd323f3234ffd34f" };
  const req = { get: jest.fn((header) => `Bearer ${user.token} `), user };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();

  test("test guard case: user exists", () => {
    passport.authenticate = jest.fn((strategy, options, cb) => (res, req, next) => {
      cb(null, user);
    });
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("test guard case: user doesn't exist", () => {
    passport.authenticate = jest.fn((strategy, options, cb) => (res, req, next) => {
      cb(null, false);
    });
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: HTTP_MESSAGES.ERROR,
      code: HTTP_CODES.UNAUTHORIZED,
      message: HTTP_MESSAGES.INVALID_CREDENTIALS,
    });
  });
  test("test guard case: wrong token", () => {
    passport.authenticate = jest.fn((strategy, options, cb) => (res, req, next) => {
      cb(null, { token: "234fddf44" });
    });
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: HTTP_MESSAGES.ERROR,
      code: HTTP_CODES.UNAUTHORIZED,
      message: HTTP_MESSAGES.INVALID_CREDENTIALS,
    });
  });
});
