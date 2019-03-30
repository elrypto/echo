pragma solidity ^0.5.0;


contract EchoRegister {
  mapping (address => string) ownerToIndexName;
  mapping (uint => address) registered;
  uint registeredCount;

 
  event indexRegistered(string _name, address _address);
  
  modifier indexMustExist(){
    bytes memory emptyStringTest = bytes(ownerToIndexName[msg.sender]);
    require(emptyStringTest.length != 0, " Index must exist, call createIndex() and initialize first.");
    _;
  }

  


  function createIndex(string memory _name) public {
    ownerToIndexName[msg.sender] = _name;
    emit indexRegistered(_name, msg.sender);
  }

  function getIndexName() public view returns (string memory) {
    return ownerToIndexName[msg.sender];
  }
}
