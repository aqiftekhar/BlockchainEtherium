//npm install @truffle/hdwallet-provider

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { AbiInterface, ByteCodeObject } = require('./compile');

const provider = new HDWalletProvider(
    //Add Account Mnmonic
    'foam remove cannon excess above grant attract ghost frost census bracket ocean'/
    //Infura API link for Rinkeby
    'https://rinkeby.infura.io/v3/88654b894a064bb0bb98858cf80bacef'
);

const web3 = new Web3(provider);
