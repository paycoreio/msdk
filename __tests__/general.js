const SDK = require("../src/index");

describe("GENERAL", () => {
  test("Creates a new instance without errors", function() {
    expect(
      () =>
        new SDK({
          apiKey: "1234567890"
        })
    ).not.toThrow();
  });

  test("Creates a new instance with error if no API key passed ", function() {
    expect(() => new SDK({})).toThrow();
  });

  test("Expec to init an SDK with valid API key without errors", function() {
    const PCSDK = new SDK({
      apiKey: "1234567890"
    });
    expect(PCSDK.apiKey).toBe("1234567890");
  });

  test("Expec to init an SKD with valid currency", function() {
    const PCSDK = new SDK({
      apiKey: "1234567890",
      currency: "USD"
    });
    expect(PCSDK.currency).toBe("USD");
  });
});
