const ECVerify = artifacts.require("./ECVerify.sol");
const utils = require("./utils.js");


contract('ECVerify', function(accounts) {

    it("should sign transaction (works with testrpc only)", async () => {
        var sha; var r; var s; var v;
        let text = "example";
        let ecverify = await ECVerify.new();
        [sha, v, r, s] = await utils.signString(web3, accounts[0], text);
    	let hash = web3.sha3("\x19Ethereum Signed Message:\n" + text.length + text);
	    var result = await ecverify.verify(hash, v, r, s);        
        assert.isOk(await ecverify.isCorrect(hash, v, r, s, accounts[0]));	
        console.log(web3.fromAscii("haopeng"));
    });

});