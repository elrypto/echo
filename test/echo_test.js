const Echo = artifacts.require("./Echo.sol");


const testval = "best windex";
const zrx = "ZRX";
const mkr = "MKR";
const weth = "WETH";


contract("Echo", accounts => {
  it("...should store the index name:" + testval, async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.createIndex(testval, { from: accounts[0] });
    const storedData = await echoInstance.getIndexName.call();
    assert.equal(storedData, testval, "The value:" + testval + " was not stored.");
  });

  it("...should addToken ZRX", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.addToken(zrx, 10, { from: accounts[0] });
    let token  = await echoInstance.getToken(0);
    assert.equal(token[0], zrx, "The token " + zrx + " was not stored.");
  });

});

contract("Echo", accounts => {
  it("...should have a token count of 1", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.addToken(zrx, 10, { from: accounts[0] });
    let count = await echoInstance.tokenCount({ from: accounts[0] });
    assert.equal(1, count, "The token could should have been 1.");
  });
});


contract("Echo", accounts => {
  it("...should get 3 tokens that were just added", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.addToken(zrx, 1, { from: accounts[0] });
    await echoInstance.addToken(mkr, 1, { from: accounts[0] });
    await echoInstance.addToken(weth, 1, { from: accounts[0] });
    let count = await echoInstance.tokenCount({ from: accounts[0] });
    assert.equal(3, count, "The token could should have been 3.");

    let result = await echoInstance.tokensForOwner(accounts[0]);
    let res1 = await echoInstance.getToken(result[0]);
    let res2 = await echoInstance.getToken(result[1]);
    let res3 = await echoInstance.getToken(result[2]);
    
    assert.equal(zrx, res1[0], "expected zrx in first slot");
    assert.equal(mkr, res2[0], "expected mkr in first slot");
    assert.equal(weth, res3[0], "expected weth in first slot");
  });
});


