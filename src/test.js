describe("Calculator", function() {
  let near;
  let contract;
  let alice;
  let bob = "bob.near";
  let eve = "eve.near";
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  // Common setup below
  beforeAll(async function () {
    near = await nearAPI.connect(nearConfig);
    accountId = nearConfig.contractName;
    contract = await near.loadContract(accountId, {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["addLongNumbers"],
      sender: nearConfig.contractName
    });
    window.near = near;
  });

  // Multiple tests can be described below. Search Jasmine JS for documentation.
  describe("simple", function() {
    beforeAll(async function() {
    // There can be some common setup for each test.
    });

    it("adds one digit", async function() {
      const params = {
        a: "1",
        b: "3"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("4");
    });

    it("should work with first string longer", async function() {
      const params = {
        a: "10",
        b: "3"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("13");
    });

    it("should work with second string longer", async function() {
      const params = {
        a: "4",
        b: "15"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("19");
    });

    it("should work with carry", async function() {
      const params = {
        a: "19",
        b: "22"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("41");
    });

    it("should work when result is one digit longer than largest input", async function() {
      const params = {
        a: "91",
        b: "22"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("113");
    });

    it("should work with really large input", async function() {
      const params = {
        a: "29348756231984613809465238956138947136497182364018246710289467102946710289467198046",
        b: "1"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("29348756231984613809465238956138947136497182364018246710289467102946710289467198047");
    });
  });
});