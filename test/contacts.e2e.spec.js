const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = require("../app");
const db = require("../model/db");
const User = require("../model/userScheme");
const Users = require("../repositories/user");
const Contact = require("../model/contactsScheme");
const { newContact, newUser } = require("./data/data");

describe("test contacts' routes", () => {
  let user, token;
  beforeAll(async () => {
    await db;
    await User.deleteOne({
      email: newUser.email,
    });
    user = await User.create(newUser);
    const SECRET_KEY = process.env.SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await Users.updateToken(user._id, token);
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUser.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
  });

  describe("GET request", () => {
    test("should return status 200 get all contacts", async () => {
      const response = await request(app).get("/api/contacts").set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.payload.contacts).toBeInstanceOf(Array);
    });
    test("should return status 200 get contact by id", async () => {});
    test("should return status 404 get contact with no id", async () => {});
    test("should return status 404 get contact with wrong id", async () => {});
  });
  describe("POST request", () => {});
  describe("DELETE request", () => {});
});
