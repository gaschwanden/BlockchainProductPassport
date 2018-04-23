pragma solidity ^0.4.0;
import "./authority/Roles.sol";

contract PaymentForward {
    address destination;
    function PaymentForward(address from,address destination_, unit256 amount) public{
        destination=destination_;
        destination.transfer(msg.value);

    }
}

contract ForwarderFactoryEvents {
    event LogForwarderCreated(address forwarder);
    event LogPaymentForwarded(address from, address destination, uint256 amount);
}



contract ForwarderFactory is RolesFunction {
    mapping(address => bool) forwarders;

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