const Web3 = require('web3');
const ETH_HOST = "rinkeby.infura.io";
const ETH_URL = 'wss://rinkeby.infura.io/v3/393be4249e1c41239b63a60c555f7bea';
//const ETH_HOST = "http://127.0.0.1:7545";
//const ETH_HOST = "http://127.0.0.1:9645";


function watchEtherTransfers() {
    // Instantiate web3 with WebSocket provider
    const web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://${ETH_HOST}/ws`));
    //const web3 = new Web3(ETH_HOST);
    //const web3 =  new Web3.providers.HttpProvider(ETH_HOST);

    // Instantiate subscription object
    const subscription = web3.eth.subscribe('pendingTransactions');
  
    // Subscribe to pending transactions
    subscription.subscribe((error, result) => {
      if (error) console.log(error)
    })
    .on('data', async (txHash) => {
      try {
        // Instantiate web3 with HttpProvider
        //const web3Http = new Web3.providers.HttpProvider(ETH_URL);
        const web3Api = new Web3.providers.WebsocketProvider(ETH_URL);

        // Get transaction details
        const trx = await web3Api.eth.getTransaction(txHash);
  
        //const valid = validateTransaction(trx);
        // If transaction is not valid, simply return
        if (!valid) return
  
            console.log('Transaction hash is: ' + txHash + '\n');
            //console.log('Found incoming Ether transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO);
            //console.log('Transaction value is: ' + process.env.AMOUNT);
            //console.log('Transaction hash is: ' + txHash + '\n');
    
            // Initiate transaction confirmation
            //confirmEtherTransaction(txHash);
    
            // Unsubscribe from pending transactions.
            subscription.unsubscribe();
      }
      catch (error) {
        console.log(error)
      }
    })
  }


  module.exports = {
    watchEtherTransfers,
    ETH_HOST
  }