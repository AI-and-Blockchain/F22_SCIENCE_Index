const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

const mnemonic = process.env.MNEMONIC
const url = process.env.RPC_URL

module.exports = {
  networks: {
    cldev: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    binance_testnet: {
      provider: () => new HDWalletProvider(mnemonic,'https://data-seed-prebsc-1-s1.binance.org:8545'),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider("a3a8f8ff109b907efb8918c007ed3a2ff3f1ca99706c4326c570cfd7f94ac3f6", 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY)
      },
      network_id: '5'
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
}
