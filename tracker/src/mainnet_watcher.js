require('dotenv').config()
const Web3 = require('web3');
const {ERC20ABI} = require('./erc20');
const INFURA_HTTP = 'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY;
const INFURA_RINKEBY_HTTP = 'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY;
const INFURA_RINKEBY_WSS = 'wss://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY;
const INFURA_BASE_RINKEBY_WSS = 'wss://rinkeby.infura.io/ws';
const ZRX_CONTRACT_ADDR = '0xe41d2489571d322189246dafa5ebde1f4699f498';


function getZRXPastEvents() {
    let web3 = new Web3(INFURA_HTTP);
    let contract = new web3.eth.Contract(ERC20ABI, ZRX_CONTRACT_ADDR);
          //allEvents
    contract.getPastEvents(
        'Approval', { fromBlock:5662378, toBlock: 'latest' }, (error, events) => {
            console.log(events);
        }
    );
}

function getBlocks(){
    let web3 = new Web3(INFURA_HTTP);

    let allBlocks;
    web3.eth.getBlock('latest', (error, block) => {
        console.log('blocks recieved');
        allBlocks = block;
        let tx = allBlocks.transactions[0];  
        console.log(tx);
        web3.eth.getTransaction(tx, (error, transaction) => {
            console.log(transaction);
        });
    });
}

async function subscribe(){
    console.log("watching mainet via infura:" + INFURA_BASE_RINKEBY_WSS);
    let web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_BASE_RINKEBY_WSS));

    const subscription = web3.eth.subscribe('pendingTransactions');

    subscription.subscribe((error, result) => {
        if (error) console.log(error)
      })
        .on('data', async (txHash) => {
          try {
            // Instantiate web3 with HttpProvider
            const web3Http = new Web3(INFURA_RINKEBY_HTTP)
    
            console.log("txHash heard:" + JSON.stringify(txHash));
            // Get transaction details
            const trx = await web3Http.eth.getTransaction(txHash)
            
            const valid = true;
            //const valid = validateTransaction(trx)
            // If transaction is not valid, simply return
            if (!valid) return
    
            //console.log('Found incoming Ether transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO);
            //console.log('Transaction value is: ' + process.env.AMOUNT)
            //console.log('Transaction hash is: ' + txHash + '\n')
    
            // Initiate transaction confirmation
            //confirmEtherTransaction(txHash)
    
            console.log("transaction was:" + JSON.stringify(trx));

            // Unsubscribe from pending transactions.
            subscription.unsubscribe()
          }
          catch (error) {
            console.log(error)
          }
        })


   /* let allBlocks;
    web3.eth.getBlock('latest', (error, block) => {
        console.log('blocks recieved');
        allBlocks = block;
        let tx = allBlocks.transactions[0];  
        console.log(tx);
        web3.eth.getTransaction(tx, (error, transaction) => {
            console.log(transaction);
        });
    });*/
}
