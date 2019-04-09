pragma solidity ^0.5.0;

contract EchoRegister {
  mapping (address => uint) addressToState;
  uint registeredCount = 0;
  address[] addresses;

  event indexRegistered(address _address);

  modifier onlyOne() {
    _;
  }

  function registerAddress() public onlyOne{
    //make sure only one
    registeredCount++;
    addressToState[msg.sender] = 1;  // 1 is active
    addresses.push(msg.sender);
    emit indexRegistered(msg.sender);
  }

  function getRegisteredState() public view returns (uint){
    return addressToState[msg.sender];
  }

  function getCount() public view returns (uint){
    return registeredCount;
  }

  function getAllRegistered() public view returns (address[] memory){
    return addresses;
  }
  
}

/*
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

  modifier onlyOnePerAddress(){
    bytes memory indexStr = bytes( registeredToIndexName[msg.sender]);
    require(indexStr.length < 1, " Only one index per address, you can update the name or you must remove it before creating another");
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


  function createIndex(string memory _name) public onlyOnePerAddress {
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

  function getIndexForAddress(address _addr) public view returns (string memory){
    return registeredToIndexName[_addr];
  }
}
*/