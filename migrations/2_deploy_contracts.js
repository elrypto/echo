var Echo = artifacts.require("./Echo.sol");
var EchoRegister = artifacts.require("./EchoRegister.sol");

module.exports = function(deployer) {
  deployer.deploy(Echo);
  deployer.deploy(EchoRegister);
};
