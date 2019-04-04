require('dotenv').config();

const INFURA_ROPSTEN_HTTP = 'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY;
const INFURA_BASE_ROPSTEN_WSS = 'wss://ropsten.infura.io/ws';
const INFURA_ROPSTEN_WS = 'wss://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY;

const Web3 = require('web3');

//const web3 = new Web3('ws://localhost:7545');
const web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_BASE_ROPSTEN_WSS));
//authWeb = new Web3...

module.exports = web3