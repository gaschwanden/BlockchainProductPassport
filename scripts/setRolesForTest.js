var PPC = artifacts.require('PPcoin')
var TokenLogic = artifacts.require('TokenLogic')
var Roles = artifacts.require('Roles')
var Users = artifacts.require('Users')



const setRole = (contract, roleName)=>{
  const testUser = web3.eth.accounts[2]
  const coinbase = web3.eth.accounts[0]
  const roles = Roles.at(Roles.address)

  contract =contract.at(contract.address)
  let hashOfContract =undefined

  return contract.contractHash()
    .then(hash => hashOfContract = hash)
    .then(() => contract.hasRole(roleName))
    .then(hasRole=>{
        if(hasRole){
            console.log('There has role: ', roleName,'in',contract.contructor._json.contractName, hasRole)
        }else{
            console.log('create role', roleName, 'in', contract.constructor._json.contractName, hasRole)
            return roles.addContractRole(ctrct, roleName)
        }
    })
    .then(tx => roles.grantUserRole(ctrct, roleName, testUser))
    .then(tx => roles.grantUserRole(ctrct, roleName, coinbase))
    .catch(err => console.log('ERROR create role', roleName, 'in', contract.constructor._json.contractName))
}

module.exports = function (deployer, network) {
    if (network === 'mainnet') return
    return setRole(PPC, 'minter')
        .then(() => setRole(TokenLogic, 'admin'))
        .then(() => setRole(Roles, 'admin'))
        .then(() => setRole(Users, 'userManager'))
      .catch(console.log)
  }