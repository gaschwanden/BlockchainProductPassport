//let utils = require('../migration/utils')
var PPC = artifacts.require("PPcoin");
var TokenLogic = artifacts.require('TokenLogic')
var Roles = artifacts.require('Roles')


module.exports = function(deployer,network) {
  var ppc
  const accounts=web3.eth.accounts
  let roles = undefined

  function setRole (contract, roles,roleName){
    let hash = ''
    return contract.contractHash()
    .then(h => {
      hash = h
      return contract.hasRole(roleName)
    })
    .then(hasRole => {
      if (!hasRole) {
        return roles.addContractRole(hash, roleName)
      }
    }) 
  }
  function setRoleForPPC (){
      return Roles.deployed()
      .then(r => {
        roles = r
        return deployer.deploy(PPC, roles.address)
      })
      .then(() => PPC.deployed())
      .then(p => {
        ppc = p
        return deployer.deploy(TokenLogic, ppc.address, 0, roles.address)
       })

       .then(() => ppc.setLogic(TokenLogic.address))
       .then(()=> setRole(ppc,roles,'admin'))
       .then(()=> setRole(ppc,roles,'minter'))
  }

  function deployPPC(){
      return deployer.deploy(PPC,roles.address)
        .then(()=>PPC.deployed())
  }

  return setRoleForPPC()
    .then (()=>deployPPC())
};