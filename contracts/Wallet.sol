
pragma solidity ^0.4.19;
import "./Token/PPcoin.sol";
import "./Users.sol";


contract WalletEvents {
    event LogWalletAdded(address wallet);
    event LogWalletRemoved(address wallet);
}


contract Wallet is  WalletEvents {

    enum Type{
        initial, transfer, removal
    }
    enum State{
        initial, pending, executed,rejected
    }

    Type public type;
    State public state;


    function Wallet(address _owner,  bytes3 _initalBalance) public onlyOwner
    {
        owner = _owner;
        initialBalance = _initalBalance;
    }

    function transfer(TokenLogic token, address dst, unit128 wad) public onluOwner{
        token.transfer(dst,wad);
    }
    function transferFrom (TokenLogic token,address _from, address _to, uint256 _value) public{
        token.transferFrom(_from,_to,_value);
    }

}

