pragma solidity ^0.5.0;


contract EchoRegister {
  mapping (address => string) registeredToIndexName;
  mapping (uint => address) registeredToAddress;
  uint registeredCount;

  event indexRegistered(string _name, address _address);
  
  modifier indexMustExist(){
    bytes memory emptyStringTest = bytes( registeredToIndexName[msg.sender]);
    require(emptyStringTest.length != 0, " Index must exist, call createIndex() and initialize first.");
    _;
  }


  function getCount() public view returns(uint){
    return registeredCount;
  }

  function getAllAddresses() view public returns (address[] memory) {
    address[] memory result = new address[](registeredCount);
    for (uint i = 0; i < registeredCount; i++){
        result[i] = registeredToAddress[i+1];
    }
    return result;
  }


  function createIndex(string memory _name) public {
    registeredToIndexName[msg.sender] = _name;
    registeredCount++;
    registeredToAddress[registeredCount] = msg.sender;
    emit indexRegistered(_name, msg.sender);
  }

  function getIndexName() public view returns (string memory) {
    return registeredToIndexName[msg.sender];
  }

  function getAddressForId(uint _id) public view returns (address){
    return registeredToAddress[_id];
  }
}
