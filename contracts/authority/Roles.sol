pragma solidity ^0.4.4;

import "./Owned.sol";


contract RolesEvents {
    event LogRoleAdded(bytes32 hashOfContract, string roleName);
    event LogRoleRemoved(bytes32 hashOfContract, string roleName);
    event LogRoleGranted(bytes32 hashOfContract, string roleName, address user);
    event LogRoleRevoked(bytes32 hashOfContract, string roleName, address user);
}


contract rolesTest is Owned{

    bytes32 public contractHash;

    function rolesTest(string contractName_, address roles_) public{

        require(roles_!=address(0x0));
        contractHash = keccak256(contractName_);
        roles = roles_;
    }

    modifier onlyRole(string role) {
        require(senderHasRole(role));
        _;
    }

    modifier roleOrOwner(string role) {
        require(msg.sender == owner || senderHasRole(role));
        _;
    }

    function hasRole(string roleName) public view returns (bool){
        return roles.knownRoleNames(contractHash, keccak256(roleName));
    }


    function senderHasRole(string roleName) public view returns (bool){
        return hasRole(roleName)&& roles.roleList(contractHash, keccak256(roleName),msg.sender);
    }

    function setRolesContract (address roles_) public onlyOwner {
        require(this !=address(roles));
        roles =roles_;
    }
}

contract Roles is RolesEvents,rolesTest {
    // mapping is contract -> role -> sender_address -> boolean
    mapping(bytes32 => mapping (bytes32 => mapping (address => bool))) public roleList;
    // the intention is
    mapping (bytes32 => mapping (bytes32 => bool)) public knownRoleNames;

    //add roles user pair

    function Roles() rolesTest("RolesDatabase",this) public {

    }


    function addContractRole(bytes32 hashOfContract, string roleName) public roleOrOwner("admin") {
        require(!knownRoleNames[hashOfContract][keccak256(roleName)]);
        knownRoleNames[hashOfContract][keccak256(roleName)] = true;
        LogRoleAdded(hashOfContract, roleName);
    }

    function removeContractRole(bytes32 hashOfContract, string roleName) public roleOrOwner("admin") {
        require(knownRoleNames[hashOfContract][keccak256(roleName)]);
        delete knownRoleNames[hashOfContract][keccak256(roleName)];
        LogRoleRemoved(hashOfContract, roleName);
    }

    function grantUserRole(bytes32 hashOfContract, string roleName, address user) public roleOrOwner("admin") {
        require(knownRoleNames[hashOfContract][keccak256(roleName)]);
        roleList[hashOfContract][keccak256(roleName)][user] = true;
        LogRoleGranted(hashOfContract, roleName, user);
    }

    function revokeUserRole(bytes32 hashOfContract, string roleName, address user) public roleOrOwner("admin") {
        delete roleList[hashOfContract][keccak256(roleName)][user];
        LogRoleRevoked(hashOfContract, roleName, user);
    }

}



