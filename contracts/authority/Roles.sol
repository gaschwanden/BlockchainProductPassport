pragma solidity ^0.4.4;

import "./Owned.sol";



interface RolesStandard {
    function hasRole(string roleName) public view returns (bool);
    function rolesList(bytes32 hashOfContract, bytes32 hashOfName, address member) public view returns (bool);
    function addContractRole(bytes32 hashOfContract, string roleName) public;
    function removeContractRole(bytes32 hashOfContract, string roleName) public;
    function grantUserRole(bytes32 hashOfContract, string roleName, address user) public;
    function revokeUserRole(bytes32 hashOfContract, string roleName, address user) public;
}


contract RolesEvents {
    event LogRoleAdded(bytes32 hashOfContract, string roleName);
    event LogRoleRemoved(bytes32 hashOfContract, string roleName);
    event LogRoleGranted(bytes32 hashOfContract, string roleName, address user);
    event LogRoleRevoked(bytes32 hashOfContract, string roleName, address user);
}


contract RolesFunction is Owned {
    RolesStandard public roles;
    bytes32 public hashOfContract;
    bool public stopped = false;

    function RolesFunction(string contractName_, address roles_) public view{
        hashOfContract = keccak256(contractName_);
        roles = RolesStandard(roles_);
    }

    modifier stoppable() {
        require(!stopped);
        _;
    }

    // returns true if the role has been defined for the contract
    function hasRole(string roleName) public view returns (bool) {
        return roles.knownRoleNames(hashOfContract, keccak256(roleName));
    }

    function senderHasRole(string roleName) public view returns (bool) {
        return hasRole(roleName) && roles.roleList(hashOfContract, keccak256(roleName), msg.sender);
    }

    function stop() public roleOrOwner("stopper") {
        stopped = true;
    }

    function restart() public roleOrOwner("restarter") {
        stopped = false;
    }

    function setRolesContract(address roles_) public onlyOwner {
        // it must not be possible to change the roles contract on the roles contract itself
        require(this != address(roles));
        roles = RolesI(roles_);
    }

}




contract Roles is RolesEvents, SecuredWithRoles {
    // mapping is contract -> role -> sender_address -> boolean
    mapping(bytes32 => mapping (bytes32 => mapping (address => bool))) public roleList;
    // the intention is
    mapping (bytes32 => mapping (bytes32 => bool)) public knownRoleNames;

    function Roles() SecuredWithRoles("RolesRepository", this) public {}

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
