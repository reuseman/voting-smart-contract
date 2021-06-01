# Peer to Peer and Blockchains assignment
A simple Solidity smart contract for elections of a Mayor in the magical land of Valadilène.

## Quickstart

### Requirements

    npm install
    npm install truffle -g

### Compile the smart contract

    truffle compile

### Run the tests

    truffle test

#### With a bigger number of voters

1. Uncomment in the `truffle-config.js` the following part:

        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        }

2. Run ganache with a custom number of accounts

        npx ganache-cli -a 500

3. Run tests

        truffle test