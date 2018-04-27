
pragma solidity ^0.4.19;

import "./authority/Roles.sol";

contract PaymentForwarder {
    address public destination;

    function PaymentForwarder(address destination_) public {
        destination = destination_;
        forwarder = (msg.sender);
    }

    function () payable public {
        destination.transfer(msg.value);
        forwarder.emitLogPaymentForwarded(msg.sender, address(this), msg.value);
    }
}


contract ForwarderFactoryEvents {
    event LogForwarderCreated(address forwarder);
    event LogPaymentForwarded(address from, address destination, uint256 amount);
}


contract ForwarderFactory is ForwarderFactoryEvents, rolesTest {
    mapping(address => bool) forwarders;

    function ForwarderFactory(address rolesContract) public SecuredWithRoles("Forwarder", rolesContract) {
        // nothing to do, just calling super
    }

    function createForwarder(address destination) public roleOrOwner("admin") {
        PaymentForwarder forwarder = new PaymentForwarder(destination);
        forwarders[forwarder] = true;
        LogForwarderCreated(address(forwarder));
    }

    function emitLogPaymentForwarded(address from, address destination, uint256 amount) public {
        require(forwarders[msg.sender]);
        LogPaymentForwarded(from, destination, amount);
    }
}
