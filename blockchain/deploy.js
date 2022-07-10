//npm install @truffle/hdwallet-provider

// curl https://mainnet.infura.io/v3/88654b894a064bb0bb98858cf80bacef \
// -X POST \
// -H "Content-Type: application/json" \
// -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { AbiInterface, ByteCodeObject } = require('./compile');

const provider = new HDWalletProvider(
    //Add Account mnemonic
    'foam remove cannon excess above grant attract ghost frost census bracket ocean',
    //Infura API link for Rinkeby
    'https://rinkeby.infura.io/v3/88654b894a064bb0bb98858cf80bacef'
);

const web3 = new Web3(provider);
let INITIAL_MESSAGE = 'Hi There!';

const deploy = async () => {
    //Get list of accounts.
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    //Deploy Contract with initial arguments
    const result =  await new web3.eth.Contract(AbiInterface)
                    .deploy({data: ByteCodeObject, arguments: [INITIAL_MESSAGE]})
                    .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to | ',result.options.address);

    //To prevent a hanging deployment, stop provider engine
    provider.engine.stop();
};

deploy();

//To run, node deploy.js

// Attempting to deploy from account 0x1D36B34362C6793B0Ce6f95E40A172E931d98291
// Contract deployed to |  0x5f1367895a0F2B63279dd59241aCC2097D3E9357
