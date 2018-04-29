pragma solidity ^0.4.18;
import "./Owned.sol";
import "./Roles.sol";

contract Users is Owned {
    struct User {
        uint age;
        bytes16 fName;
        bytes16 lName;
        address wallet;
    }
    mapping (address => User) user;
    address[] public userAccts;

    event userInfo(
        bytes16 fName,
        bytes16 lName,
        uint age,
        address wallet
    );

    function setUser(address _address, uint _age, bytes16 _fName, bytes16 _lName, address _wallet ) onlyOwner public {
        var user = users[_address];
        user.age = _age;
        user.fName = _fName;
        user.lName = _lName;
        user.wallet = _wallet;
        userAccts.push(_address) -1;
        userInfo(_fName, _lName, _age);
    }

    function getUsers() view public returns(address[]) {
        return userAccts;
    }

    function getUser(address _address) view public returns (uint, bytes16, bytes16, address) {
        return (users[_address].age, users[_address].fName, users[_address].lName, users[_address].wallet);
    }

    function countUsers() view public returns (uint) {
        return userAccts.length;
    }

}