const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {AbiInterface, ByteCodeObject } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    //Get a List of all accounts async
    accounts = await web3.eth.getAccounts();

    // console.log(AbiInterface);
    // console.log(ByteCodeObject);

    //Use one of those account to deploy the contract
    inbox = await new web3.eth.Contract(AbiInterface)
            .deploy({data: ByteCodeObject, arguments: ['Hi There!']})
            .send({from: accounts[0], gas: '1000000'});
});

it('describes accounts', () => {
    console.log('Etherium Accounts = ', accounts);
    console.log('Inbox Account = ', inbox);
});