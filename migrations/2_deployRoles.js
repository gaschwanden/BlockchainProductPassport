var Roles = artifacts.require('Roles')

module.exports = function (deployer) {
  let roles
  let rHash
  
  return deployer.deploy(Roles)
    .then(() => Roles.deployed())
    // .then(r => {
    //   roles = r
    //   return deployer.deploy(roles.address)
    // })
    // .then(res => {
    //   rHash = res[0]
    //   return roles.addContractRole(rHash, 'admin')
    // });
    // .then(() => roles.grantUserRole(rHash, 'admin', deployer.address))
}
