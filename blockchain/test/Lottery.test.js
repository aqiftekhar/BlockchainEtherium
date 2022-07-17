const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const {AbiInterface, ByteCodeObject} = require('../compile');

let lottery;
let accounts;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(AbiInterface)
    .deploy({data : ByteCodeObject})
    .send({from: accounts[0], gas: '1000000'})
});

describe('Lottery Contract', () => {
    it('Deploys a Contract', () => {
        //Validate if contract is deployed successfully!
        assert.ok(lottery.options.address);
    });
    it('allowed one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(1, players.length);
        assert.equal(accounts[0], players[0]);

    })
})