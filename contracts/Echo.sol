pragma solidity ^0.5.0;

contract Echo {
  string indexName;
  //mapping (address => string) indexName;

  mapping (uint => address) public tokenToOwner;
  mapping (address => uint) ownerTokenCount;

  struct Token{
    string symbol;
    uint amount; 
  }

  Token[] public tokens;

  event tokenAdded(uint id, string symbol, uint amount);


  function addToken(string memory _symbol, uint _amount) public {
    //TODO:require(validation)
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
    
  }
  
  function tokenForOwner() public view returns (uint[] memory){

  }
  
  */

  function setIndexName(string memory _name) public {
    indexName = _name;
  }

  function getIndexName() public view returns (string memory) {
    return indexName;
  }
}
