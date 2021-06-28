const guard = require("../helpers/guard");
const { HTTP_CODES } = require("../helpers/constants");
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
    expect(next).toHaveBeenCalled();
  });
});
