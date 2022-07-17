const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const {AbiInterface, ByteCodeObject} = require('../compile');

let lottery;
let accounts;

//Deploy Contract and getAccounts 
beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(AbiInterface)
    .deploy({data : ByteCodeObject})
    .send({from: accounts[0], gas: '1000000'})
});


describe('Lottery Contract', () => {

    //Validate if the contract is deployed successfully!
    it('Deploys a Contract', () => {
        assert.ok(lottery.options.address);
    });

    //Add One User in the Lottery and validate
    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(1, players.length);
        assert.equal(accounts[0], players[0]);
    });

    //Enter multiple users in the lottery and validate
    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });
        
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(3, players.length);
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);

    });

    //Validate that ether/wei amount cannot be less than specified in contract
    it('requires a minimum amount of ether to enter', async() => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 10
            });
            assert(false);      
        } catch (error) {
            assert(error);
        }

    });
})