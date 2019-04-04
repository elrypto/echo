const watcher = require('./../ethwatcher');
const mainnetWatcher = require('../mainnet_watcher');
const robstenWatcher = require('./../robsten_watcher');
const ganacheWatcher = require('./../ganache_watcher');
//const {ETH_HOST} = watcher;

    //console.log('Starting watcher for host: ' + ETH_HOST);
    //watcher.watchEtherTransfers();
    //mainnetWatcher.getBlocks();
    //robstenWatcher.rainContract();
    //mainnetWatcher.subscribe();

    ganacheWatcher.createAccount();

    console.log('... watcher started');