const Web3 = require ('web3');
const { readFileSync } = require('fs');
const LoomTruffleProvider = require('loom-truffle-provider');
const {CryptoUtils, Client, LoomProvider, LocalAddress} = require('loom-js');

const privateKey = CryptoUtils.generatePrivateKey();
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
);

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(publicKey).toString();

// Instantiate web3 client using LoomProvider
const web3 = new Web3(new LoomProvider(client, privateKey));

const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewValueSet","type":"event"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

const contractAddress = '0x7c40eFe4E2E980C0236adBa8032430901680339E';

// Instantiate the contract and let it ready to be used
const contract = new web3.eth.Contract(ABI, contractAddress, {from});
