const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {AbiInterface, ByteCodeObject } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
let INITIAL_MESSAGE = 'Hi There!';
let INITIAL_MESSAGE_CHANGED = 'Hello!';

beforeEach(async () => {
    //Get a List of all accounts async
    accounts = await web3.eth.getAccounts();

    // console.log(AbiInterface);
    // console.log(ByteCodeObject);

    //Use one of those account to deploy the contract
    inbox = await new web3.eth.Contract(AbiInterface)
            .deploy({data: ByteCodeObject, arguments: [INITIAL_MESSAGE]})
            .send({from: accounts[0], gas: '1000000'});
});

it('describes accounts', () => {
    // console.log('Etherium Accounts = ', accounts);
    // console.log('Inbox Account = ', inbox);

    //Assert deployment and Validate address is assigned to contract we have deployed
    assert.ok(inbox.options.address);
    console.log(inbox.options.address);
});

it('has a default message', async() => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
});

it('can change the message', async() => {
    await inbox.methods.setMessage(INITIAL_MESSAGE_CHANGED).send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE_CHANGED);
    // console.log(message);
});