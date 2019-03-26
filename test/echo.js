const Echo = artifacts.require("./Echo.sol");
const testval = "mememe";


contract("Echo", accounts => {
  it("...should store the value:" + testval, async () => {
    const echoInstance = await Echo.deployed();

    // Set value of 89
    await echoInstance.set(testval, { from: accounts[0] });

    // Get stored value
    const storedData = await echoInstance.get.call();

    assert.equal(storedData, testval, "The value:" + testval + " was not stored.");
  });
});
