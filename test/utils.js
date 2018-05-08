var Roles = artifacts.require('Roles')

async function addRole (roleName, contract, account) {
  let roles = Roles.at(Roles.address)
  let ctrhash = await contract.contractHash()
  let hasRole = await contract.hasRole(roleName)
  if (!hasRole) { await roles.addContractRole(ctrhash, roleName) }
  let tx = await roles.grantUserRole(ctrhash, roleName, account)
  return tx
}

Object.assign(exports, {
  addRole
})
