const mongoose = require("mongoose");
const db = require("../setup/db");
const CustomerLoan = require("../../models/loanModel");

const loanData = {
    customerName: "JohnB",
    loanAmount: 15000,
    interest: 3,
    loanTermYears: 20,
    loanType: "subsidized",
    description: "student loan",
    address: "123 Olive Ave",
    phoneNumber: 123456789,
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});


/**
 * Loan model
 */
describe("Loan model", () => {
  it("create & save loan successfully", async () => {
    const validLoan = new CustomerLoan(loanData);
    const savedLoan = await validLoan.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedLoan._id).toBeDefined();
    expect(savedLoan.customerName).toBe(loanData.customerName);
    expect(savedLoan.phoneNumber).toBe(loanData.phoneNumber);
    expect(savedLoan.address).toBe(loanData.address);
    expect(savedLoan.insertedDate).toBeDefined();
    expect(savedLoan.createdDate).toBeDefined();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert loan successfully, but the field not defined in schema should be undefined", async () => {
    const loanWithInvalidField = new CustomerLoan({
      ...loanData,
      loanEndDate: Date.now,
    });
    const savedLoanWithInvalidField = await loanWithInvalidField.save();
    expect(savedLoanWithInvalidField._id).toBeDefined();

    // invalid field should be undefined
    expect(savedLoanWithInvalidField.loanEndDate).toBeUndefined();
  });

 // Should not be able to create customerLoan without require fields
  it("create loan without required field should failed", async () => {
    const loanWithoutRequiredField = new CustomerLoan({ customerName: "John" });
    let err;
    try {
      await loanWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});