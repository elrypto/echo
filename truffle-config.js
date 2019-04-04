const { readFileSync } = require('fs')
const path = require('path')
const { join } = require('path')
const LoomTruffleProvider = require('loom-truffle-provider')
const HDWalletProvider = require('truffle-hdwallet-provider')

// load .env file
require('dotenv').config()


module.exports = {
  contracts_build_directory: join(__dirname, 'client/src/contracts'),
  compilers: {
    solc: {
      version: '0.4.24'
    }
  },
  networks: {
    loom_dapp_chain: {
      provider: function() {
        const privateKey = readFileSync(path.join(__dirname, 'private_key'), 'utf-8')
        const chainId = 'default'
        const writeUrl = 'http://192.168.43.120:46658/rpc'
        const readUrl = 'http://192.168.43.120:46658/query'
        const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
        loomTruffleProvider.createExtraAccountsFromMnemonic("gravity top burden flip student usage spell purchase hundred improve check genre", 10)
        return loomTruffleProvider
      },
      network_id: '*'
    },
    loomv2b: {
      provider: function() {
        const privateKey = readFileSync(path.join(__dirname, 'loomv2b_pk'), 'utf-8')
        const chainId = 'loomv2b'
        const writeUrl = 'http://loomv2b.dappchains.com:46658/rpc'
        const readUrl = 'http://loomv2b.dappchains.com:46658/query'
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
      },
      network_id: '12106039541279'
    },
    extdev_plasma_us1: {
      provider: function() {
        const privateKey = readFileSync(path.join(__dirname, 'extdev_private_key'), 'utf-8')
        const chainId = 'extdev-plasma-us1'
        const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc'
        const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query'
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
      },
      network_id: '9545242630824'
    },
    rinkeby: {
      provider: function() {
        if (!process.env.INFURA_API_KEY) {
          throw new Error("INFURA_API_KEY env var not set")
        }
        return new HDWalletProvider(process.env.MNENOMIC, `https://rinkeby.infura.io/${process.env.INFURA_API_KEY}`, 0, 10)
      },
      network_id: 4,
      gasPrice: 15000000001,
      skipDryRun: true
    },
    ropsten: {
      provider: function() {
        if (!process.env.INFURA_API_KEY) {
          throw new Error("INFURA_API_KEY env var not set")
        }
        return new HDWalletProvider(process.env.MNENOMIC, `https://ropsten.infura.io/${process.env.INFURA_API_KEY}`, 0, 10)
      },
      network_id: 3,
      gasPrice: 45000000001,
      skipDryRun: true
    }
  }
}




/*
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};*/
