//let utils = require('../migration/utils')
var PPC = artifacts.require("PPcoin");
var TokenLogic = artifacts.require('TokenLogic')
var Roles = artifacts.require('Roles')


module.exports = function(deployer,network) {
  var ppc
  const accounts=web3.eth.accounts
  let roles = undefined


  // exports.setRole = function(contract, roles, roleName) {
//   let hash = ''
//   return contract.contractHash()
//     .then(h => {
//       hash = h
//       return contract.hasRole(roleName)
//     })
//     .then(hasRole => {
//       if (!hasRole) {
//         return roles.addContractRole(hash, roleName)
//       }
//     })
// }

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
       .then(() => PPC.setLogic(TokenLogic.address))
       .then(()=> utils.setRole(ppc,roles,'admin'))
       .then(()=> utils.setRole(ppc,roles,'minter'))
  }

  function deployPPC(){
      return deployer.deploy(PPC,'PPcoin',roles.address)
        .then(()=>PPC.deployed())
  }

  return setRoleForPPC()
    .then (()=>deployPPC())
};