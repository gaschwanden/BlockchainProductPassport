var Roles = artifacts.require('Roles')

module.exports = function (deployer) {
  return deployer.deploy(Roles)
    .then(() => Roles.deployed())


   
    //.then(() => roles.grantUserRole(rHash, 'admin', accounts[0]))
    //.then(() => roles.addContractRole(vfHash, 'vaultCreator'))    
}
