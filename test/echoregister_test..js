const Echo = artifacts.require("./EchoRegister.sol");

const testval = "myIndex";

contract("EchoRegister", accounts => {
  it("...should store the index name:" + testval, async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.createIndex(testval, { from: accounts[0] });
    const storedData = await echoInstance.getIndexName.call();
    assert.equal(storedData, testval, "The value:" + testval + " was not stored.");
  });
});


contract("EchoRegister", accounts => {
  it("...expect that will return accounts[0] for this:" + testval, async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.createIndex(testval, { from: accounts[0] });
    const address = await echoInstance.getAddressForId(1);
    //console.log("address=" + address);
    assert.equal(accounts[0], address, "The value:" + accounts[0] + " was not returned.");
  });
});


contract("EchoRegister", accounts => {
  it("...3 accounts returned:" + testval, async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.createIndex("first index", { from: accounts[0] });
    await echoInstance.createIndex("second index", { from: accounts[1] });
    await echoInstance.createIndex("third index", { from: accounts[2] });
    const all = await echoInstance.getAllAddresses();
    assert.equal(accounts[0], all[0], "The value:" + accounts[0] + " was not returned.");
    assert.equal(accounts[1], all[1], "The value:" + accounts[1] + " was not returned.");
    assert.equal(accounts[2], all[2], "The value:" + accounts[2] + " was not returned.");
  });
});

