let utils = require('./utils')
var PPC = artifacts.require("PPcoin");
var TokenLogic = artifacts.require('TokenLogic')
var Roles = artifacts.require('Roles')



module.exports = function(deployer,network) {
  var ppc

  var logic
  const accounts = web3.eth.accounts

  
  let roles = undefined
  
  deployer.deploy(Roles)
  .then(() => Roles.deployed())
  .then(r => {
          roles = r
          return deployer.deploy(PPC, roles.address)
  })
  .then(p => {
    ppc = p
    return deployer.deploy(TokenLogic, ppc.address, 0, roles.address)
   }) 

   .then(l => {
        logic = l
        return PPC.deployed()
   })


  .then(() => ppc.setLogic(TokenLogic.address))
  .then(()=> utils.setRole(ppc,roles,'admin'))
  .then(()=> utils.setRole(ppc,roles,'minter'))



  .then(() => ppc.contractHash())
  .then(contractHash => roles.grantUserRole(contractHash, 'minter', accounts[0]))
  .then(() => ppc.mintFor(accounts[0], 1e26))
  

  // Roles.deployed()
  //   .then(r => {
  //     roles = r
  //     return deployer.deploy(Token, 'TestCoin', 'TTC', roles.address)
  //   })
  //   .then(() => deployer.new(TokenLogic, Token.address, 0, roles.address))
  //   .then(l => {
  //     logic = l
  //     return Token.deployed()
  //   })
  //   .then(t => {
  //     token = t
  //     return t.setLogic(logic.address)
  //   })
  //   .then(() => utils.setRole(token, roles, 'minter'))
  //   .then(() => token.contractHash())
  //   .then(contractHash => roles.grantUserRole(contractHash, 'minter', accounts[0]))
  //   .then(() => token.mintFor(accounts[0], 1e26))
  // }

  // function PPcoin (){
  //     return Roles.deployed()
  //     .then(r => {
  //       roles = r
  //       return deployer.deploy(PPC, roles.address)
  //     })
  //     .then(() => PPC.deployed())
  //     .then(p => {
  //       ppc = p
  //       return deployer.deploy(TokenLogic, ppc.address, 0, roles.address)
  //      })
  //      .then(() => TokenLogic.deployed())
  //      .then(() => ppc.setLogic(TokenLogic.address))
  //      .then(()=> utils.setRole(ppc,roles,'admin'))
  //      .then(()=> utils.setRole(ppc,roles,'minter'))
  // }

  // function deployPPC(){
  //   return PPC.deployed()
  //   .then(()=>deployer.deploy(PPC,roles.address))
     
  // }


  // return PPcoin()
  //    .then (()=>deployPPC())
  //   .then (()=>web3.version.getNetwork(function(err,res) {console.log(err,res);}))
};