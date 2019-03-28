import React, { Component } from 'react';
import EchoContract from "./../../contracts/Echo.json";
import getWeb3 from "./../../utils/getWeb3";


export default class IndexNaming extends Component {
    state = {
      indexNameFromBlock: "",
      indexNameText: "",
      web3: null, 
      accounts: null, 
      contract: null, 
    }


    /*TODO: this could go in a parent or a mixin */
    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = EchoContract.networks[networkId];
          const instance = new web3.eth.Contract(
            EchoContract.abi,
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
        this.setState({indexNameFromBlock: response});
      }
    
    

    textIndextNameChangeHandler = e => {
        this.setState({ indexNameText : e.target.value});
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
        this.setState({ indexNameFromBlock: response });
        
    };


  render() {
    return( 
      <div>
        <label for="index_name">Index Name: {this.state.indexNameFromBlock}</label>
        <input id="index_name" type="text" onChange={this.textIndextNameChangeHandler} value={this.state.indexNameText} />
        <button class="btn btn-secondary" onClick={this.storeValue}>Save Name</button>
      </div>
    );
  }
}


