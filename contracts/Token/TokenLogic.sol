pragma solidity ^0.4.21;
import "../Token/TokenStandard.sol";
import "../Token/TokenEvents.sol";
import "../Token/TokenData.sol";
import "../authority/Roles.sol";
import "../Token/PPcoin.sol";
import "../Token/SafeMath.sol";




contract TokenLogicEvents {
    event AdditionToBlackList(address user);
    event RemovalFromBlackList(address user);
}

//cannot
interface TokenLogicI {
    function totalSupply() public view returns (uint256 supply);
    function balanceOf( address who ) public view returns (uint256 value);
    function allowance( address owner, address spender ) public view returns (uint256 _allowance);
    function transferFrom( address from, address to, uint256 value) public returns (bool ok);
    function transfer( address owner, address to, uint256 value) public returns (bool ok);
    function approve( address owner, address spender, uint256 value ) public returns (bool ok);

    function setToken(address token_) public;
    function mintFor(address dest, uint256 wad) public;
    function burn(address src, uint256 wad) public;
}

contract TokenLogic is  TokenLogicI,TokenLogicEvents, rolesTest {

    TokenData public data;
    PPcoin public token;

    mapping (address =>  bool) public blackList;

    bytes32[] public listNames;

    bool public freeTransfer = true;

    function TokenLogic(
        address token_,
        address tokenData_,
        address role) public rolesTest("TokenLogic", role)
    {
        require(token_ != address(0x0));
        require(role != address(0x0));

        token = PPcoin(token_);
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
        require(freeTransfer || src == owner || dst == owner );
        require(notInBlackList(src)&&notInBlackList(dst));
        _;
    }

    function notInBlackList(address user) returns (bool){
        return ! blackList[user];
    }
    function listNamesLen() public view returns (uint256) {
        return listNames.length;
    }

    function addToBlackList(address user) public onlyRole("userManager") {
        blackList[user] = true;
        AdditionToBlackList( user);
    }

    function removeFromBlackList( address user) public onlyRole("userManager") {
        blackList[user] = false;
        RemovalFromBlackList(user);
    }

    function setFreeTransfer(bool isFree) public onlyOwner {
        freeTransfer = isFree;
    }

    function setToken(address token_) public onlyOwner {
        token = PPcoin(token_);
    }

    function totalSupply() public view returns (uint256) {
        return data.supply();
    }

    function balanceOf(address src) public view returns (uint256) {
        return data.balances(src);
    }

    function allowance(address src, address spender) public view returns (uint256) {
        return data.approvals(src, spender);
    }

    function transfer(address src, address dst, uint wad) public tokenOnly canTransfer(src, dst)  returns (bool) {
        data.setBalances(src, SafeMath.safeSub(data.balances(src), wad));
        data.setBalances(dst, SafeMath.safeAdd(data.balances(dst), wad));
        return true;
    }

    function transferFrom(address src, address dst, uint256 wad) public tokenOnly canTransfer(src, dst)  returns (bool) {
        // balance and approval check is not needed because sub(a, b) will throw if a<b
        data.setApprovals(src, dst, SafeMath.safeSub(data.approvals(src, dst), wad));
        data.setBalances(src, SafeMath.safeSub(data.balances(src), wad));
        data.setBalances(dst, SafeMath.safeAdd(data.balances(dst), wad));
        return true;
    }

    function approve(address src, address dst, uint256 wad) public tokenOnly returns (bool) {
        data.setApprovals(src, dst, wad);
        return true;
    }

    function mintFor(address dst, uint256 wad) public tokenOnly {
        data.setBalances(dst, SafeMath.safeAdd(data.balances(dst), wad));
        data.setSupply(SafeMath.safeAdd(data.supply(), wad));
    }

    function burn(address src, uint256 wad) public tokenOnly {
        data.setBalances(src, SafeMath.safeSub(data.balances(src), wad));
        data.setSupply(SafeMath.safeSub(data.supply(), wad));
    }

}


