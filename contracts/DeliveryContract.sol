pragma solidity ^0.4.0;

contract DeliveryContract {
    address owner;

    bytes32 public name;
    bytes32 public code;

    uint escrowed_amount;
    enum Stages {
        New,
        HasAttributes,
        WaitingForParties,
        InProgress,
        Complete,
        Canceled,
        Reimbursed
    }

    struct Attribute {
        bytes32 identifer;
        int min;
        int max;
    }

    struct Measurement {
        bytes32 attribute_id;
        int value;
        bytes32 event_id;
        uint timestamp;
        uint block_timestamp;
        bytes32 farmer_id;
        bytes32 batch_id;
    }

    struct Party {
        address wallet;
        uint amount;
        bool has_accepted;
    }

    function DeliveryContract(){

    }
}
