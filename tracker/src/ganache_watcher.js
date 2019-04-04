const Web3 = require('web3');
const {ERC20ABI} = require('./erc20');
const GANACHE_WS = "ws://127.0.0.1:7545";
//import EchoRegister from './../../contracts/EchoRegister';
const ECHO_REGISTER_CONTRACT_ADDR = "0x7e54E96482d29D079B89083D05527Ac1Bd649Ae3";

function createAccount(){
    //let web3 = new Web3(GANACHE_HTTP);
    let web3 = new Web3.providers.WebsocketProvider(GANACHE_WS);

    let contract = new web3.eth.Contract(ERC20ABI, ECHO_REGISTER_CONTRACT_ADDR);

    /*contract.getPastEvents(
        'all', { fromBlock:1, toBlock: 'latest' }, (error, events) => {
            console.log(events);
        }
    );*/

    contract.events.allEvents({fromBlock:0}, (error, event) => { console.log(event); })

}


module.exports = {
    createAccount
}

