pragma solidity ^0.4.21;

import "./authority/Roles.sol";
import "./TokenLogic.sol";
import "./TokenStandard.sol";
import "./SafeMath.sol";
import "./TokenEvents.sol";
import "./Owned.sol";

contract PPcoin is TokenStandard, TokenEvents,rolesTest {


    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint256 public totalSupply;

    string public name;
    uint8 public decimals;
    string public symbol;

    TokenLogicI public logic;
    bool public stopped = false;
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

    modifier stoppable() {
        require(!stopped);
        _;
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
    /**
     * @dev Transfer the specified amount of tokens to the specified address.
     *      Invokes the `tokenFallback` function if the recipient is a contract.
     *      The token transfer fails if the recipient is a contract
     *      but does not implement the `tokenFallback` function
     *      or the fallback function to receive funds.
     */
    function setLogic(address logic_) public logicOnly {
        assert(logic_ != address(0));
        logic = TokenLogicI(logic_);
        LogLogicReplaced(logic);
    }

    function transfer(address dst, uint256 wad) public stoppable returns (bool) {
        bool retVal = logic.transfer(msg.sender, dst, wad);
        return retVal;
    }

    function transferFrom(address src, address dst, uint256 wad) public stoppable returns (bool) {
        bool retVal = logic.transferFrom(src, dst, wad);
        return retVal;
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
