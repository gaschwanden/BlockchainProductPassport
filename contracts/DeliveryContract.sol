pragma solidity ^0.4.4;
import "./PPcoin.sol";
contract DeliveryContract {
    address owner;

    bytes32 public name;

    enum Stages {
        New,
        WaitingForParties,
        InProgress,
        Complete,
        Canceled
    }

    struct Attribute {
        bytes32 attributeName;
        int min;
        int max;
    }

    struct Measurement {
        address handler;
        bytes32 description;
        int lon;
        int lat;
        uint timestamp;
        uint blockNumber;
    }

    struct Party {
        address wallet;
        uint amount;
        bool has_accepted;
    }

    Stages public stage = Stages.New;
    Attribute [] public attributes;
    Measurement [] measurements;
    PPcoin public ppcoin;

    function DeliveryContract(bytes32 _name,  address _ppcoinAddress) {
        owner = msg.sender;
        name = _name;
        ppCoin = PPcoin(_ppcoinAddress);
    }
    //////////////////////////// imcomPlete
    function setAttributes(bytes32 [] attributeNames, int []mins, int [] maxs )onlyOwner onlyStage(Stage.New){
        stage= Stages.HasAttributes;
        for(uint i=0;i<attributeNames.length;i++){
            attributes.push(Attribute(attributeNames[i],mins[i],max[i]));
        }
    }

    function getAttributes() constant returns (bytes[], int[],int[]){

        bytes32 [] memory attributeNames = new bytes32[](attributes.length);
        int [] memory mins = new int[](attributes.length);
        int [] memory maxs = new int[](attributes.length);
        for (uint i = 0; i < attributes.length; i++) {
            attributeNames[i] = attributes[i].attributeNames;
            mins[i] = attributes[i].min;
            maxs[i] = attributes[i].max;
        }
        return (attributeNames, mins, maxs);
    }

    function addMeasurement(bytes32 description, int lon, int lat) notConsumed {
            Measurement memory measurement;
            measurement.handler = msg.sender;
            measurement.description = description;
            measurement.lon = lon;
            measurement.lat = lat;
            measurement.timestamp = now;
            measurement.blockNumber = block.number;
            measurement.push(measurement);
    }

    function getParticipants() constant returns (address [], uint []) {
        address [] memory wallets = new address[](parties.length);
        uint [] memory amounts = new uint[](parties.length);
        for (uint i = 0; i < parties.length; i++) {
            wallets[i] = parties[i].wallet;
            amounts[i] = parties[i].amount;
        }
        return (wallets, amounts);
    }

}
