pragma solidity ^0.4.16;
//https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3
//Solidity validator function
//Client code to sign a message
//Client code to call Solidity validator

contract Verifier {

    function recoverAddr(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) returns (address) {
        return ecrecover(msgHash, v, r, s);
    }

    function isFromAddr(address _addr, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) returns (bool) {
        return ecrecover(msgHash, v, r, s) == _addr;
    }

}