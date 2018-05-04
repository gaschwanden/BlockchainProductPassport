pragma solidity ^0.4.16;


contract OwnedEvents {
    event SetTheOwner (address newOwner);
}


contract Owned is OwnedEvents {
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
        SetTheOwner(owner);
    }
    
    function setOwner(address owner_) public onlyOwner {
        owner = owner_;
        SetTheOwner(owner);
    }

}
