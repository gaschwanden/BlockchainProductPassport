pragma solidity ^0.4.4;
import "./Product.sol";
import "./Owned.sol";


// the measurement of products
contract Measurements {

    struct Measurement {
        address handler;
        bytes32 attribute_id;
        int value;
        bytes32 event_id;
        bytes32 description;
        // Instant of time when the Measurement is done.
        uint timestamp;
        //v Block when the Measurement is done.
        uint blockNumber;
    }


    Measurement [] measurements;

    function addMeasurements(address [] _handlers,bytes32 [] _attributes, int [] _values, bytes32 [] _events, bytes32 [] _descriptions, uint [] _timestamps, uint [] _blockNumbers)  {
        require (_events.length == _attributes.length&&_events.length == _values.length&&
        _events.length == _timestamps.length&&_events.length == _descriptions.length&&
        _events.length == _blockNumbers.length&&_events.length == _handlers.length);
        for(uint i=0;i<_events.length;i++){
            measurements.push(Measurement(_handlers[i],_attributes[i], _values[i],   _events[i], _descriptions[i],  _timestamps[i],  _blockNumbers[i]))-1;
        }

    }


    function getMeasurements(bytes32 [])constant returns(address [], bytes32[],  int [] , bytes32 [] , bytes32 [] , uint [] , uint [] ) {

        address [] memory handles= new address[](measurements.length);
        bytes32 [] memory attributes = new bytes32[](measurements.length);
        int [] memory values =new int[](measurements.length);
        bytes32 [] memory events=new bytes32[](measurements.length);
        bytes32 [] memory descriptions=new bytes32[](measurements.length);
        uint [] memory timestamps=new uint[](measurements.length);
        uint [] memory blockNumbers=new uint[](measurements.length);
        for (uint i=0; i< measurements.length; i++){
            handles[i] = measurements[i].handler;
            attributes[i] = measurements[i].attribute_id;
            values[i] = measurements[i].value;
            events[i] = measurements[i].event_id;
            descriptions[i] = measurements[i].description;
            timestamps[i] = measurements[i].timestamp;
            blockNumbers[i] = measurements[i].blockNumber;
        }

        return (handles,attributes,values,events,descriptions,timestamps,blockNumbers);
    }



    function getMeasurement(uint i, uint[]) constant returns (bytes32, int){
        return (measurements[i].attribute_id, measurements[i].value);
    }


}
