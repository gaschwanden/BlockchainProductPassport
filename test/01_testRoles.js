var Roles = artifacts.require('Roles')
var PPC = artifacts.require('PPcoin')
//let utils = require('./utils')


contract('Roles', function (accounts) {
  let roles
  let contractHash


  beforeEach(async () => {
    roles = await Roles.deployed()
    contractHash = await roles.contractHash()
  })

  it('Roles has accounts[0] as owner', async () => {
    assert.equal(await roles.owner(), accounts[0])
  })

  it('Roles is named RolesDatabase', async () => {
    assert.equal(contractHash, web3.sha3('RolesDatabase'))
  })

  it('Roles can add a new role for the contract', async () => {
    assert.isFalse(await roles.hasRole('testRole'))
    await roles.addContractRole(contractHash, 'testRole')
    assert.ok(await roles.hasRole('testRole'))
   
  })


  it('Roles can remove a role for the contract', async () => {
    assert.ok(await roles.hasRole('testRole'))
    await roles.removeContractRole(contractHash, 'testRole')
    assert.notOk(await roles.hasRole('testRole'))
   
  })

  it('Roles can grant a role to a user in the contract', async () => {
    await roles.addContractRole(contractHash, 'admin')
    // roles has role 'admin'
    //assert.ok(await roles.hasRole('admin'))
    //sender has role to grant role for user
    await roles.grantUserRole(contractHash, 'admin', accounts[2])
    assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[2]))
    // now that the user is permissioned it should work
    await roles.grantUserRole(contractHash, 'admin', accounts[3], {from: accounts[2]})
    assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[3]))
  })
  
  it('Roles can revoke a role from a user in the contract' ,async ()=>{
    assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[2]))
    await roles.revokeUserRole(contractHash, 'admin', accounts[2], {from: accounts[2]})
    assert.notOk(await roles.roleList(contractHash, web3.sha3('admin'), accounts[2]))

    // now that the user is not permissioned, it should not work
    assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[3]))
  })


})