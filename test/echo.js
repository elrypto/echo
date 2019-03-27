const Echo = artifacts.require("./Echo.sol");

const testval = "best windex";

contract("Echo", accounts => {
  it("...should store the index name:" + testval, async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.setIndexName(testval, { from: accounts[0] });
    const storedData = await echoInstance.getIndexName.call();
    assert.equal(storedData, testval, "The value:" + testval + " was not stored.");
  });

  it("...should addToken ZRX", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.addToken("ZRX", 10, { from: accounts[0] });
    var tokenCount = await echoInstance.tokens;
    console.log(tokenCount.length);
  });
});



