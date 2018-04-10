pragma solidity ^0.4.4;

contract TokenStandard {
    function totalSupply() public view returns (uint256 supply);
    function balanceOf( address who ) public  view returns (uint256 value);
    function allowance( address owner, address spender ) public view returns (uint256 _allowance);
    function burn( uint256 wad ) public;
    function triggerTransfer(address src, address dst, uint256 wad) public;
    function transfer( address to, uint256 value) public returns (bool ok);
    function transferFrom( address from, address to, uint256 value) public returns (bool ok);
    function approve( address spender, uint256 value ) public returns (bool ok);

    function mintFor(address recipient, uint256 wad) public;
}


