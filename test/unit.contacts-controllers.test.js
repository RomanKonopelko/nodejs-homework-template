const { updateContact } = require("../controllers/contacts");
const Contact = require("../repositories/contact");

jest.mock("../repositories/contact");

describe("Unit test controller contacts", () => {
  const req = { user: { id: 1 }, body: { name: null }, params: { id: 1 } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
  const next = jest.fn();

  test("test update fn: empty body req contact", async () => {
    const empty_req = { user: { id: 1 }, body: {}, params: { id: 1 } };
    const contact = { name: "Roman", email: "test123123@mail.com", number: "0650403299" };
    Contact.updateContact = jest.fn(() => {
      return contact;
    });
    const result = await updateContact(empty_req, res, next);
    expect(result).toBeDefined();
    expect(result.status).toEqual("Error");
    expect(result.code).toEqual(404);
    expect(result.message).toEqual("Missing required fields");
  });

  test("test update fn: contact exists", async () => {
    const contact = { name: "Roman", email: "test123123@mail.com", number: "0650403299" };
    Contact.updateContact = jest.fn(() => {
      return contact;
    });
    const result = await updateContact(req, res, next);
    expect(result).toBeDefined();
    expect(result.status).toEqual("Success");
    expect(result.code).toEqual(201);
    expect(result.payload.contact).toEqual(contact);
  });

  test("test update fn: contact doesn't exist", async () => {
    Contact.updateContact = jest.fn();
    const result = await updateContact(req, res, next);
    expect(result).toBeDefined();
    expect(result.status).toEqual("Error");
    expect(result.code).toEqual(404);
    expect(result.message).toEqual("Not found");
  });

  test("test update fn: repositories return Error", async () => {
    Contact.updateContact = jest.fn(() => {
      throw new Error("Failed");
    });
    await updateContact(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
