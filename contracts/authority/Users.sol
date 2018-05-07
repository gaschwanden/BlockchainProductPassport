pragma solidity ^0.4.21;
import "../authority/Owned.sol";
import "../authority/Roles.sol";

contract Users is Owned {
    struct User {
        uint age;
        bytes16 fName;
        bytes16 lName;
    }

    mapping (address => User) users;
    address[] public userAccts;

    event userInfo(
        bytes16 fName,
        bytes16 lName,
        uint age
    );

    function setUser(address _address, uint _age, bytes16 _fName, bytes16 _lName ) onlyOwner public {
        var user = users[_address];
        user.age = _age;
        user.fName = _fName;
        user.lName = _lName;
        userAccts.push(_address) -1;
        userInfo(_fName, _lName, _age);
    }

    function getUsers() view public returns(address[]) {
        return userAccts;
    }

    function getUser(address _address) view public returns (uint, bytes16, bytes16) {
        return (users[_address].age, users[_address].fName, users[_address].lName);
    }

    function countUsers() view public returns (uint) {
        return userAccts.length;
    }

}