const EchoRegister = artifacts.require("./EchoRegister.sol");



contract("EchoRegister", accounts => {
  it("...basic address registration:", async () => {
    const echoInstance = await EchoRegister.deployed();
    const tx = await echoInstance.registerAddress({from:accounts[0]});
    const retval = await echoInstance.getRegisteredState({from:accounts[0]});
    //console.log(tx);
    assert.equal(retval, 1, "state for this registered address should be 1 (active)");
  });

  it("...count should be 1, then 2:", async () => {
    const echoInstance = await EchoRegister.deployed();
    let count = await echoInstance.getCount();
    assert.equal(count, 1, "should be 1 in the count");
    const tx = await echoInstance.registerAddress({from:accounts[1]});
    count = await echoInstance.getCount();
    assert.equal(count, 2, "should be 2 in the count, after adding another");
  });

  it("...should return 2 in the address array:", async () => {
    const echoInstance = await EchoRegister.deployed();
    const addrs = await echoInstance.getAllRegistered();
    assert.equal(addrs.length, 2, "should be 2 in the count, after adding another");
  });


});

/*
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
  it("...3 accounts returned:", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.createIndex("first index", { from: accounts[0] });
    await echoInstance.createIndex("second index", { from: accounts[1] });
    await echoInstance.createIndex("third index", { from: accounts[2] });
    const all = await echoInstance.getAllAddresses();
    assert.equal(accounts[0], all[0], "The value:" + accounts[0] + " was not returned.");
    assert.equal(accounts[1], all[1], "The value:" + accounts[1] + " was not returned.");
    assert.equal(accounts[2], all[2], "The value:" + accounts[2] + " was not returned.");
    //console.log("count returned" + await echoInstance.getCount());
    let count = await echoInstance.getCount();
    //console.log("count =" + count);
    assert.equal(count, 3, "Count should be 3")
  });
});


contract("EchoRegister", accounts => {
  it("...that it will not allow me to create more than 1 index for this address:", async () => {
    const echoInstance = await Echo.deployed();
    await echoInstance.createIndex(testval, { from: accounts[0] });
    
    try{
      await echoInstance.createIndex(testval, { from: accounts[0] });
    }catch(err){
      assert(err.toString().indexOf("Only one index per address") != -1)
      //console.log(err);
    }
  });

  it("...will return the index with the addresss provided", async () => {
    const echoInstance = await Echo.deployed();
    let expected = await echoInstance.getIndexForAddress(accounts[0]);
    await echoInstance.createIndex("gibberish", { from: accounts[1] });
    assert.equal(expected, testval, "correct index not returned for this address");
    let unexpected = await echoInstance.getIndexForAddress(accounts[1]);
    assert(testval != unexpected, "two addresses should not return the same index name (for this test)");
  });

});

*/