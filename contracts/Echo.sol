pragma solidity ^0.5.0;


contract Echo {
  mapping (address => string) ownerToIndexName;
  mapping (uint => address) public tokenToOwner;
  mapping (address => uint) ownerTokenCount;

  Token[] public tokens;

  event tokenAdded(uint id, string symbol, uint amount);

  struct Token{
    string symbol;
    uint amount; 
  }

  function addToken(string memory _symbol, uint _amount) public {
    //TODO:require(validation)
    //TODO:require ownerToIndexName[msg.sender] != "" || exists 
            // error = "you must create a index before adding a token by calling createindex"
    uint id = tokens.push(Token(_symbol, _amount)) - 1;
    tokenToOwner[id] = msg.sender;
    ownerTokenCount[msg.sender]++;    
    emit tokenAdded(id, _symbol, _amount);

  }

  function tokenCount() public view returns (uint){
    return ownerTokenCount[msg.sender];
  }

  function getToken(uint _id) public view returns(string memory, uint){
    return (tokens[_id].symbol, tokens[_id].amount);
  }

  /*function removeToken(uint _id) public {
        require(tokenToOwner[_id]==msg.sender);

  }

  function removeAllTokens() public {
    
  }*/
  
  function tokensForOwner(address _owner) public view returns (uint[] memory){
    uint[] memory result = new uint[](ownerTokenCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < tokens.length; i++){
        if(tokenToOwner[i]==_owner){
            result[counter] = i;
            counter++;
        }
    }
    return result;
  }
  


  function createIndex(string memory _name) public {
    ownerToIndexName[msg.sender] = _name;
  }

  function getIndexName() public view returns (string memory) {
    return ownerToIndexName[msg.sender];
  }
}
