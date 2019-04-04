const watcher = require('./../ethwatcher');
const mainnetWatcher = require('../mainnet_watcher');
const ropstenWatcher = require('./../ropsten_watcher');
const ganacheWatcher = require('./../ganache_watcher');
//const {ETH_HOST} = watcher;

    //console.log('Starting watcher for host: ' + ETH_HOST);
    //watcher.watchEtherTransfers();
    //mainnetWatcher.getBlocks();
    //robstenWatcher.rainContract();
    //mainnetWatcher.subscribe();

    //ropstenWatcher.getPreviousCreatedAccounts();

    ropstenWatcher.watchForAccountCreated();

    console.log('... watcher started');