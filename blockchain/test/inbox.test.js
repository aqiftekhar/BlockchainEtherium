const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

beforeEach(() => {
    //Get a List of all accounts
    web3.eth.getAccounts()
    .then(fetchedAccounts => {
        console.log(fetchedAccounts);
    })
    .catch(error => console.log(error));

});

it('describes accounts', () => {

});