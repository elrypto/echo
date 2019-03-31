import React, { Component } from "react";
import EchoRegisterContract from "./../../contracts/EchoRegister.json";
import getWeb3 from "../../utils/getWeb3";


export default class RegisterAddress extends Component {
  state = { 
    currentIndexName: "", 
    web3: null, 
    accounts: null, 
    contract: null, 
    indexNameText: "",
    tokenToAddSymbol: "",
    tokenToAddAmount: 0
  };


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EchoRegisterContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EchoRegisterContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });

      this.getExistingIndex();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  getExistingIndex = async() => {
    const { contract } = this.state;
    const response = await contract.methods.getIndexName().call();
    this.setState({currentIndexName: response});
  }


  storeValue = async () => {
    const { accounts, contract, web3 } = this.state;
    console.log("using web3 version:" + web3.version);

    // Stores a given value, 5 by default.
    await contract.methods.createIndex(this.state.indexNameText).send({ from: accounts[0] });
    this.setState({indexNameText: "" });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getIndexName().call();
    // Update state with the result.
    this.setState({ currentIndexName: response });
    
  };


  addToken = async() => {
    const { accounts, contract, web3 } = this.state;
    console.log("using web3 version:" + web3.version);
    console.log(`adding token sym:${this.state.tokenToAddSymbol} amount:${this.state.tokenToAddAmount}`);

    await contract.methods.addToken(this.state.tokenToAddSymbol, this.state.tokenToAddAmount)
                                .send({ from: accounts[0] });

    this.setState({
      tokenToAddSymbol: "",
      tokenToAddAmount: 0
    })
  }


  textIndextNameChangeHandler = e => {
    this.setState({ indexNameText : e.target.value});
  }

  symbolChangeHandler = e => {
    this.setState({ tokenToAddSymbol: e.target.value });
  }

  amountChangeHandler = e => {
    this.setState({ tokenToAddAmount: e.target.value });
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div class="container-fluid padding">
		  <div class="row text-center">
            <div>Index name is: {this.state.currentIndexName}</div>
                <input type="text" onChange={this.textIndextNameChangeHandler} value={this.state.indexNameText} />
                <button class="btn btn-secondary" onClick={this.storeValue}>Create Index (name)</button>
           </div>
        </div>    
      </div>
    );
  }
}


