let utils = require('./utils')
var Product = artifacts.require("Product");

module.exports = function (deployer) {
    return deployer.deploy(Product)
      .then(() => Product.deployed())

}

// var ProductFactory = artifacts.require("ProductFactory");

// module.exports = function (deployer) {
//     return deployer.deploy(ProductFactory)
//       .then(() => ProductFactory.deployed())

// }

// module.exports = function (deployer, network) {
//     let ctrctHash
//     let productName
//     let roles = undefined
//     deployer.deploy(Roles)
//       .then(r=> {
//         roles=r
//       return deployer.deploy(Product, roles.address);
//     })
//       .then(ctrct => {
//         mesrment = Measurements.at(Measurements.address)
//         return mesrment.contractHash()
//       })
//       .then(hash => {
//         ctrctHash = hash
//         return mesrment.addContractRole(ctrctHash, 'admin')
//       })
//       .then(() => {
//         return mesrment.grantUserRole(ctrctHash, 'admin', web3.eth.accounts[5])
//       })
//   }
  