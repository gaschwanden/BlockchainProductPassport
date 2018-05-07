// var Math = artifacts.require('Math')
// var TokenLogic = artifacts.require('TokenLogic')

// module.exports = function (deployer, network) {
//   deployer.deploy(Math).then(() => deployer.link(
//     Math,
//     [TokenLogic]))
// }
var safeMath = artifacts.require("./safeMath.sol");

module.exports = function(deployer) {
  deployer.deploy(safeMath);
};