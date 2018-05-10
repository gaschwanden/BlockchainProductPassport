
var Roles = artifacts.require('Roles')

async function assertThrowsAsynchronously (test, error) {
  try {
    await test()
  } catch (e) {
    if (!error || e instanceof error) { return 'everything is fine' }
  }
  throw new Error('Missing rejection' + (error ? ' with ' + error.name : ''))
}

async function addRole (roleName, contract, account) {
  let roles = Roles.at(Roles.address)
  let ctrhash = await contract.contractHash()
  let hasRole = await contract.hasRole(roleName)
  if (!hasRole) { await roles.addContractRole(ctrhash, roleName) }
  let tx = await roles.grantUserRole(ctrhash, roleName, account)
  return tx
}
async  function byte32toAscii (aString) {
  return web3.toAscii(aString).replace(/\0/g, '')
};

async function byte32ArraytoAsciiArray (byte32Array) {
  return byte32Array.map( e => web3.toAscii(e).replace(/\0/g, '') );
};

Object.assign(exports, {
  assertThrowsAsynchronously,
  addRole,
  byte32toAscii,
  byte32ArraytoAsciiArray,
})
