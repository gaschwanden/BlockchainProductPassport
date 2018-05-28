
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




async function signString (web3, account, text) {
  let sha = web3.fromUtf8(text);
  var sig = await web3.eth.sign(account, sha);
  sig = sig.substr(2, 130);
  let r = "0x" + sig.substr(0, 64);
  let s = "0x" + sig.substr(64, 64);
  var v = web3.toDecimal('0x'+sig.substr(128, 2));        
  if (v!=27 && v!=28) v+=27;
  v = web3.toHex(v);
  return [sha, v, r, s];
}

Object.assign(exports, {
  assertThrowsAsynchronously,
  addRole,
  byte32toAscii,
  byte32ArraytoAsciiArray,
  signString,
})
