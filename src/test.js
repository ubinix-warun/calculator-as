const getConfig = require('./config');
let nearConfig = getConfig("development");
require('dotenv').config({ path: '/workspace/calculator-as/neardev/dev-account.env' })

describe("CalculatorAPI", function() {
  let near;
  let contract;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  // Common setup below
  beforeAll(async function () {
    near = await nearAPI.connect({
    deps: {
     keyStore: new nearAPI.keyStores.UnencryptedFileSystemKeyStore('../../../home/gitpod/.near-credentials')
    },
    ...nearConfig
  })
    accountId = process.env.CONTRACT_NAME;
    contract = await near.loadContract(accountId, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: [],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ["calculate", "addLongNumbers"],
    sender: process.env.CONTRACT_NAME
    });
  });

  // Multiple tests can be described below. Search Jasmine JS for documentation.
  describe("simple", function() {
    beforeAll(async function() {
    // There can be some common setup for each test.
    });

    it("add one digit", async function() {
      const params = {
        a: "1",
        b: "99"
      };

      const result = await contract.calculate(params);
      expect(result).toBe("100");
    });
  });
});