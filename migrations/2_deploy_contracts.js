var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Echo = artifacts.require("./Echo.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Echo);
};
