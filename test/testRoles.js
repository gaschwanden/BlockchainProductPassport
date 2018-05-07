var Roles = artifacts.require('Roles')
var PPC = artifacts.require('PPcoin')
let utils = require('./utils')


contract('Roles', function (accounts) {
  let roles
  let contractHash
  let error
  before(async () => {
    roles = await Roles.deployed()
    contractHash = await roles.contractHash()
  })

  it('can grant a role to a user in the contract', async () => {
    await assertThrowsAsynchronously(() => roles.grantUserRole(contractHash, 'admin', accounts[1], {from: accounts[5]}))
    await roles.grantUserRole(contractHash, 'admin', accounts[5])
    assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[5]))
   // now that the user is permissioned it should work
    await roles.grantUserRole(contractHash, 'admin', accounts[6])
    assert.notok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[6]))
  })

  // it('has accounts[0] as owner', async () => {
  //   assert.equal(await roles.owner(), accounts[0])
  // })
  // it('is named RolesDatabase', async () => {
  //   assert.equal(contractHash, web3.sha3('RolesDatabase'))
  // })

  // it('can add a new role for the contract', async () => {
  //   assert.isFalse(await roles.hasRole('testRole'))
  //   await roles.addContractRole(contractHash, 'testRole')
  //   assert.ok(await roles.hasRole('testRole'))
  // })

  async function assertThrowsAsynchronously (test, error) {
    try {
      await test()
    } catch (e) {
      if (!error || e instanceof error) { return 'everything is fine' }
    }
    throw new Error('Missing rejection' + (error ? ' with ' + error.name : ''))
  }

  it('can grant a role to a user in the contract', async () => {
    await assertThrowsAsynchronously(() => roles.grantUserRole(contractHash, 'admin', accounts[1], {from: accounts[5]}))
    await roles.grantUserRole(contractHash, 'admin', accounts[5])
    assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[5]))
   // now that the user is permissioned it should work
    await roles.grantUserRole(contractHash, 'admin', accounts[6])
    assert.notok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[6]))
  })
  

  // it('can revoke a role from a user in the contract', async () => {
  //   assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[5]))
  //   await roles.revokeUserRole(contractHash, 'admin', accounts[5], {from: accounts[5]})
  //   assert.isFalse(await roles.roleList(contractHash, web3.sha3('admin'), accounts[5]))

  //   // now that the user is not permissioned anymore it should not work
  //   assert.ok(await roles.roleList(contractHash, web3.sha3('admin'), accounts[6]))
    
  //   try {
  //     await roles.revokeUserRole(web3.sha3('RolesRepository'), web3.sha3('admin'), accounts[6], {from: accounts[5]})
  //   } catch (e) {
  //     if (!error || e instanceof error) { return 'everything is fine' }
  //   }
  //   throw new Error('Missing rejection' + (error ? ' with ' + error.name : ''))
  // })


})