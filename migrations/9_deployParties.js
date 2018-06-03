var Paties = artifacts.require("./authority/Parties.sol");

module.exports = function(deployer) {
  deployer.deploy(Paties);
};