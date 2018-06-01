let utils = require('./utils')
var Measurements = artifacts.require("Measurements");
var Roles = artifacts.require('Roles')



module.exports = function (deployer, network) {
    let ctrctHash
    let mesrment
    let roles = undefined
    deployer.deploy(Roles)
      .then(r=> {
        roles=r
      return deployer.deploy(Measurements, roles.address);

        
    })
      // .then(ctrct => {
      //   mesrment = Measurements.at(Measurements.address)
      //   return mesrment.contractHash()
      // })
      // .then(hash => {
      //   ctrctHash = hash
      //   return mesrment.addContractRole(ctrctHash, 'admin')
      // })
      // .then(() => {
      //   return mesrment.grantUserRole(ctrctHash, 'admin', web3.eth.accounts[5])
      // })
  }
  