var EchoRegister = artifacts.require("./EchoRegister.sol");

module.exports = function(deployer) {
  deployer.deploy(EchoRegister);
};
