pragma solidity ^0.4.4;
import "./TokenStandard.sol";
import "./TokenEvent.sol";

contract TokenLogic is Token, TokenEvents,Roles {


    ///add1
    bytes32[] public listNames;
    mapping (address => mapping (bytes32 => bool)) public whiteLists;
    bool public freeTransfer = true;


    function ERC20(
        address token_,
        address tokenData_,
        address role) public SecuredWithRoles("ERC20", role)
    {
        require(token_ != address(0x0));
        require(role != address(0x0));

        token = Token(token_);
        if (tokenData_ == address(0x0)) {
            data = new TokenData(this, msg.sender);
        } else {
            data = TokenData(tokenData_);
        }
    }

    modifier tokenOnly {
        assert(msg.sender == address(token));
        _;
    }

    modifier canTransfer(address src, address dst) {
        require(freeTransfer || src == owner || dst == owner || sameWhiteList(src, dst));
        _;
    }

    // only admin can create the list
    function addWhiteList(bytes32 listName) public onlyRole("admin") {
        require(! listExists(listName));
        require(listNames.length < 256);
        listNames.push(listName);

        //incomplete
        WhiteListAddition(listName);
    }

    function removeWhiteList(bytes32 listName) public onlyRole("admin") {
        var (i, ok) = indexOf(listName);
        require(ok);
        if (i < listNames.length - 1) {
            listNames[i] = listNames[listNames.length - 1];
        }
        delete listNames[listNames.length - 1];
        --listNames.length;

         //incomplete
        WhiteListRemoval(listName);
    }

    // only UserManager can create the list
    function addToWhiteList(bytes32 listName,address user) public onlyRole("userManager"){
    	require(listExists(listName));
    	require(!whiteLists[user][listName]);
    	UserAddToWhiteList(listName,user);
    }

    function removFromWhiteList(bytes32 listName,address user) public onlyRole("userManager"){
    	require(listExists(listName));
    	require(whiteLists[user][listName]);
    	UserRemoveFromWhiteList(listName,user);
    }

    // f freeTransfer

    //add1 end 

    function transfer(address _to, uint256 _value) returns (bool success) {
        //Default assumes totalSupply can't be over max (2^256 - 1).
        //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
        //Replace the if with this one instead.
        //if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }


    ///add

    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint256 public totalSupply;
}


