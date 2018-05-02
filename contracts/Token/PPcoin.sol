pragma solidity ^0.4.4;

import "../authority/Roles.sol";
import "./TokenLogic.sol";
import "./TokenStandard.sol";
import "./SafeMath.sol";
import "./TokenEvents.sol";


contract PPcoin is TokenStandard, TokenEvents {

    function () {
        //if ether is sent to this address, send it back.
        throw;
    }

    string public name;
    uint8 public decimals;
    string public symbol;

    TokenLogic public logic;

    function PPcoin() {
        balances[msg.sender] = 10;
        totalSupply = 1000000;
        name = "PP Token";
        decimals = 18;
        symbol = "PPC";
    }

    function approveAndCall(address _spender, uint256 _value, bytes _extraData) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);

        //call the receiveApproval function on the contract you want to be notified. This crafts the function signature manually so one doesn't have to include a contract in here just for this.
        //receiveApproval(address _from, uint256 _value, address _tokenContract, bytes _extraData)
        //it is assumed that when does this that the call *should* succeed, otherwise one would use vanilla approve instead.
        if(!_spender.call(bytes4(bytes32(sha3("receiveApproval(address,uint256,address,bytes)"))), msg.sender, _value, this, _extraData)) { throw; }
        return true;
    }


    modifier logicOnly {
        require(address(logic) == address(0x0) || address(logic) == msg.sender);
        _;
    }

    function totalSupply() public view returns (uint256) {
        return logic.totalSupply();
    }

    function balanceOf( address who ) public view returns (uint256 value) {
        return logic.balanceOf(who);
    }

    function allowance(address owner, address spender ) public view returns (uint256 _allowance) {
        return logic.allowance(owner, spender);
    }

    function triggerTransfer(address src, address dst, uint256 wad) public logicOnly {
        Transfer(src, dst, wad);
    }

    function setLogic(address logic_) public logicOnly {
        assert(logic_ != address(0));
        logic = TokenLogic(logic_);
        LogLogicReplaced(logic);
    }

    function transfer(address _to, uint256 _value) returns (bool success) {
       return logic.transfer( _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        return logic.transferFrom( _from,  _to, _value);
    }

    function approve(address guy, uint256 wad) public stoppable returns (bool) {
        bool ok = logic.approve(msg.sender, guy, wad);
        if (ok)
            Approval(msg.sender, guy, wad);
        return ok;
    }

    function pull(address src, uint256 wad) public stoppable returns (bool) {
        return transferFrom(src, msg.sender, wad);
    }

    function mintFor(address recipient, uint256 wad) public stoppable onlyRole("minter") {
        logic.mintFor(recipient, wad);
        LogMint(recipient, wad);
        Transfer(address(0x0), recipient, wad);
    }

    function burn(uint256 wad) public stoppable {
        logic.burn(msg.sender, wad);
        LogBurn(msg.sender, wad);
    }

    function setName(string name_) public roleOrOwner("admin") {
        name = name_;
    }
}
