pragma solidity ^0.4.16;

import "./Owned.sol";

contract Roles is Owned {
    // mapping is role -> sender_address -> boolean
    mapping (bytes32 => mapping (address => bool)) public roleList;

    function Roles() public {

    }

    modifier onlyRole(string role) {
        require(senderHasRole(role));
        _;
    }

    modifier roleOrOwner(string role) {
        require(msg.sender == owner || senderHasRole(role));
        _;
    }

    function senderHasRole(string roleName) public view returns (bool){
        return  roleList[keccak256(roleName)][msg.sender];
    }

  
    function grantUserRole(string roleName, address user) public roleOrOwner("admin") {
        roleList[keccak256(roleName)][user] = true;
        
    }
    function checkUserRole(string roleName, address user) public view returns(bool) {
        return roleList[keccak256(roleName)][user];
        
    }

    function revokeUserRole( string roleName, address user) public  roleOrOwner("admin") {
        roleList[keccak256(roleName)][user] = false;
        
    }

}



