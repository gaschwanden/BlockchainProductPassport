var TokenLogic = artifacts.require('TokenLogic')
var PPcoin = artifacts.require('PPcoin')
var Roles = artifacts.require('Roles')
//let helpers = require('./helpers.js')
let utils = require('./utils')

contract('PPC', function (accounts) {
  let ppcoin
  let logic
  let totalSupply
  const fs = require('fs')
  const fscb = function () { /* nothing to do in fs callback */ }
  //web3.version.getNetwork(function(err,res) {console.log(err,res);});
  //console.log(web3.currentProvider)
  before(async () => {
     ppcoin = await PPcoin.deployed()
    // web3.version.getNetwork(function(err,res) {console.log(err,res);});
     logic = await TokenLogic.at(await ppcoin.logic())
  })

  it('grants roles to account 0', async () => {
    await utils.addRole('minter', ppcoin, accounts[0])
    await utils.addRole('userManager', logic, accounts[0])
    await utils.addRole('admin', logic, accounts[0])
    assert.ok(await ppcoin.senderHasRole('minter'))
    assert.ok(await logic.senderHasRole('admin'))
    assert.ok(await logic.senderHasRole('userManager'))
  })

  it('accounts[0] is owner', () => {
    return ppcoin.owner()
      .then(owner => assert.equal(owner, accounts[0], 'accounts[0] is the owner'))
  })

  it('owner can mint tokens', () => {
    return ppcoin.totalSupply()
      .then(ts => ppcoin.mintFor(accounts[0], ts))
      .then(tx => {
        fs.appendFile('gas.csv', 'token;mint;' + tx.receipt.gasUsed + '\n', fscb)
        return Promise.all([ppcoin.balanceOf(accounts[0]), ppcoin.totalSupply()])
      })
      .then(res => {
        console.log(totalSupply = res[1].toNumber())
        assert.equal(res[0].toNumber(), totalSupply , '2e26 tokens were minted')
        assert.equal(res[1].toNumber(), totalSupply , '2e26 tokens are owned by owner')
        totalSupply = res[1].toNumber()
        console.log(totalSupply = res[1].toNumber())
      })
  })

  it('transfers tokens', async() => {
    await ppcoin.transfer(accounts[1], 5e25, {from: accounts[0]})
    .then(tx => {
      fs.appendFile('gas.csv', 'token;transfer;' + tx.receipt.gasUsed + '\n', fscb)
      return Promise.all([
        ppcoin.balanceOf(accounts[0]),
        ppcoin.balanceOf(accounts[1]),
        ppcoin.totalSupply()])
    })
    .then(res => {
      //1e25 tokens were transfered 19e25 remaining
      assert.equal(res[0].toNumber(), 15e25)
      //1e17 tokens were received
      assert.equal(res[1].toNumber(), 5e25)
      assert.equal(res[2].toNumber(), totalSupply)
    })
  })

  it('cannot tranfer between accounts which more than one of them is in the black list and setFreeTransfer is false', async() => {
    await logic.setFreeTransfer(false)
    await logic.addToBlackList(accounts[3])
    .then(tx => logic.freeTransfer())
    .then(ft => {
    assert.isNotOk(ft)
       return ppcoin.transfer(accounts[3], 5e24, {from: accounts[1]})
    })
    .then(() => assert.fail())
    .catch(error => assert(error.message.indexOf('transaction: revert') >= 0))
  })

  it('can mint for somebody new tokens', () => {
    return ppcoin.mintFor(accounts[4], 1e18, {from: accounts[0]})
      .then(tx => {
        fs.appendFile('gas.csv', 'ppcoin;mintFor;' + tx.receipt.gasUsed + '\n', fscb)
        return ppcoin.balanceOf(accounts[4])
      })
      .then(balance => assert.equal(balance.toNumber(), 1e18))
  })


})
