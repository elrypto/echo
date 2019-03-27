pragma solidity ^0.5.0;

contract Echo {
  string indexName;

  struct Token{
    string symbol;
    uint amount; 
  }

  Token[] public tokens;


  event tokenAdded(uint id, string symbol, uint amount);


  function addToken(string memory _symbol, uint _amount) public {
    //TODO: ideally, validate symbol (either via lookup, via another tokens contract, via address contract for that token is deployed)
    uint id = tokens.push(Token(_symbol, _amount)) - 1;
    emit tokenAdded(id, _symbol, _amount);

  }

  /*function removeToken(string memory symbol) public {

  }*/

  function setIndexName(string memory _name) public {
    indexName = _name;
  }

  function getIndexName() public view returns (string memory) {
    return indexName;
  }
}
