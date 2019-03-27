const Echo = artifacts.require("./Echo.sol");

const testval = "best windex";
const zrx = "ZRX"

contract("Echo", accounts => {
  it("...should store the index name:" + testval, async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.setIndexName(testval, { from: accounts[0] });
    const storedData = await echoInstance.getIndexName.call();
    assert.equal(storedData, testval, "The value:" + testval + " was not stored.");
  });

  it("...should addToken ZRX", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.addToken(zrx, 10, { from: accounts[0] });
    let token  = await echoInstance.getToken(0);
    assert.equal(token[0], zrx, "The token " + zrx + " was not stored.");
  });


  it("...should have a token count of 1", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.addToken(zrx, 10, { from: accounts[0] });

    let count = await echoInstance.tokenCount({ from: accounts[0] });
  
    let token  = await echoInstance.getToken(0);
    assert.equal(count, 1, "The token could should have been 1.");
  });
});



