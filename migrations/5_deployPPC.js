let utils = require('./utils')
var PPC = artifacts.require("PPcoin");
var TokenLogic = artifacts.require('TokenLogic')
var Roles = artifacts.require('Roles')



module.exports = function(deployer,network) {
  var ppc

  var logic
  const accounts = web3.eth.accounts

  
  let roles = undefined
  
  deployer.deploy(Roles)
  .then(() => Roles.deployed())
  .then(r => {
          roles = r
          return deployer.deploy(PPC, roles.address)
  })
  .then(p => {
    ppc = p
    return deployer.deploy(TokenLogic, ppc.address, 0, roles.address)
   }) 

   .then(l => {
        logic = l
        return PPC.deployed()
   })


  .then(() => ppc.setLogic(TokenLogic.address))
  .then(()=> utils.setRole(ppc,roles,'admin'))
  .then(()=> utils.setRole(ppc,roles,'minter'))


  .then(() => ppc.contractHash())

  .then(contractHash => roles.grantUserRole(contractHash, 'minter', accounts[0]))
  .then(() => ppc.mintFor(accounts[0], 1e26))
  
};