
exports = module.exports = {};

exports.setRole = function(contract, roles, roleName) {
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
