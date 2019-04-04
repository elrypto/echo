require('dotenv').config()

require('./web3');
const contracts = require('./contracts');
const events = require('./events')



function watchForAccountCreated(){
  //let web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_BASE_ROPSTEN_WSS));
  //let contract = new web3.eth.Contract(EchoRegister.abi, ECHO_REGISTER_ADDR);
  console.log("watchForAccountCreated");
  contracts.setup()
    .then(() => {
      events.subscribeLogEvent(contracts.list.echoRegister, 'indexRegistered');
    
    })
  
}

function getPreviousCreatedAccounts(){
  console.log("watching ropsten for account creation on echo register contract, addr:" + ECHO_REGISTER_ADDR);
  //let web3 = new Web3(INFURA_WS);
  //console.log(web3);
  //let rainContract = new web3.eth.Contract(ERC20ABI, RAIN_ADDRESS);
  //let echoRegisterContract = new web3.eth.Contract(EchoRegister.abi, ECHO_REGISTER_ADDR);
 
  let web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_BASE_ROPSTEN_WSS));
  let contract = new web3.eth.Contract(EchoRegister.abi, ECHO_REGISTER_ADDR);
  contract.getPastEvents(
    'indexRegistered', { fromBlock:5338874, toBlock: 'latest' }, (error, events) => {
        console.log(events);
    }
);


}

/*
async function interactWithAccounts(){
    let web3 = new Web3(INFURA_HTTP);
   
    console.log(web3);

  
    let entropy = (Math.random() * 1e50).toString(36);
    console.log(entropy);
    //let account = web3.eth.accounts.create(entropy);
    
    let account = web3.eth.accounts.privateKeyToAccount(privateKey);
    let account2 = web3.eth.accounts.privateKeyToAccount(privateKey2);
    console.log(account);
    console.log(account2);
    let balance = await web3.eth.getBalance(account.address);
    let balance2 = await web3.eth.getBalance(account2.address);

    console.log("balance account1: " + balance);
    console.log("balance account2: " + balance2);

    let amount = web3.utils.toWei("0.5", "ether");
    //console.log ("amount planning to send (wei):" + amount);

    let tx = {
        to: account2.address,
        value: amount,
        gas: 2000000,
        chainId: 3
    }

   // console.log(tx);

    //let signedTx;
    //let response = await web3.eth.accounts.signTransaction(tx, account.privateKey);
    //console.log(response);

   // let receipt = await web3.eth.sendSignedTransaction(response.rawTransaction);
   // console.log("tx receipt", receipt);
}


    async function rainContract(){
        let web3 = new Web3(INFURA_HTTP);
        console.log(web3);
        let rainContract = new web3.eth.Contract(ERC20ABI, RAIN_ADDRESS);
        console.log(rainContract);
        let totalSupply = await rainContract.methods.totalSupply().call();
        console.log("totalSupply:" + totalSupply);
        let account = web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log(account);
        
        let rainBalance = await rainContract.methods.balanceOf(account.address).call();
        console.log("rainBalance:" + rainBalance);
        ethBalance(account, web3);
        //xfer(account, RAIN_ADDRESS, 0.3, web3);
        rainBalance = await tokenBalance(rainContract, account.address, web3);
        console.log("rain balance:" + rainBalance);
    }
*/

    function xfer(from_account, to_address, amount, web3) {
        web3.eth.accounts.signTransaction({
        to: to_address,
        value: web3.utils.toWei(String(amount), "ether"),
        gas: 2000000,
        chainId: 3
        }, from_account.privateKey).then((tx) => {
        web3.eth.sendSignedTransaction(tx.rawTransaction)
            .then(receipt => console.log("Receipt: ", receipt))
            .catch(err => console.error(err));
        });
    }
    

    function erc20Xfer(contract, from_account, to_address, amount) {
        var xferAmount = web3.utils.toWei(String(amount), 'ether');
        var transferFunction = contract.methods.transfer(to_address, xferAmount);
        var encodedData = transferFunction.encodeABI();
      
        var tx = {
          from: from_account.address,
          to: contract.address,
          gas: 2000000,
          data: encodedData
        }
      
        web3.eth.accounts.signTransaction(tx, account.privateKey).then((signedTx) => {
          console.log("Please wait for transaction receipt.");
          console.log("This may take a minute...");
          web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .then(receipt => console.log("Receipt: ", receipt))
            .catch(error => console.error(error));
        })
      }


    function ethBalance(account, web3) {
        web3.eth.getBalance(account.address).then((response) => {
          var balance = web3.utils.fromWei(response);
          console.log("Eth balance:" + balance);
        })
      }

    async function tokenBalance(contract, holder, web3){
        let balance =  await contract.methods.balanceOf(holder).call();
        return web3.utils.fromWei(balance);
    }


module.exports = {
  getPreviousCreatedAccounts, watchForAccountCreated
}