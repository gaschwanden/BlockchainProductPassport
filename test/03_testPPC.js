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


  

})
