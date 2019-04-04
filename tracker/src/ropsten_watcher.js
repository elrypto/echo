require('dotenv').config()

const {ERC20ABI} = require('./erc20');
const Web3 = require('web3');
const INFURA_HTTP = 'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY;
const INFURA_BASE_ROPSTEN_WSS = 'wss://ropsten.infura.io/ws';
const INFURA_ROPSTEN_WS = 'wss://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY;

const RAIN_ADDRESS = '0x842e71cDD25d4B279eB3058A2FB9960b0f10D910';
const FIRE_ADDRESS = '0xb71479cc1ff8ed31e9d18bdb7f004964a56fdb89';
  //1 - 0x63B99d542d7218842649E3A7Df348498efE1e733
    //2 - 0x53D567E435480eDc44113Ea7027C586eF571446C
const privateKey = '0x2d13625d67bb22f9e0f78b0b44fb7dd8ad01f9a135084810df40296d1034979d';
const privateKey2 = '0x790794542a5b82ca945664f1de91763f9a84ba30bea4b6e098cf77c2538190c3';

const ECHO_ADDR = '0xB4AFA77EF55EdF3138306753c1bCF802603a4e05';
const ECHO_REGISTER_ADDR = '0x556c45c74d5c8b352bb327dE3F9E3CBF722c371c';
const EchoRegister = require('./contracts/EchoRegister');
//const_ECHO_REGISTER_ABI = "";

/*const EchoRegister =  require('./contracts/EchoRegister');
const ECHO_REGISTER_CONTRACT_ADDR = "0x7e54E96482d29D079B89083D05527Ac1Bd649Ae3";

function createAccount(){
    //let web3 = new Web3(GANACHE_HTTP);
    let web3 = new Web3.providers.WebsocketProvider(GANACHE_WS);

    let contract = new web3.eth.Contract(EchoRegister.abi, ECHO_REGISTER_CONTRACT_ADDR);

    console.log("contract:" + contract);
*/


function watchForAccountCreated(){
  
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
    interactWithAccounts, rainContract, getPreviousCreatedAccounts, watchForAccountCreated
}