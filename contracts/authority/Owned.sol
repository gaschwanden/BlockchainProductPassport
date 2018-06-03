

pragma solidity ^0.4.16;


contract Owned  {
    address public owner;

    function Owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnerShip(address owner_) public onlyOwner {
        owner = owner_;
       
    }
    
    function setOwner(address owner_) public onlyOwner {
        owner = owner_;
    }

    function getOwner() public constant returns (address) {
        return owner;
    }
}
