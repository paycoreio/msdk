const SDK = require("../../src/index");

const sinon = require("sinon");

const bestLaCroixFlavor = () => {
  return "grapefruit";
};

test("SDK inint", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});
