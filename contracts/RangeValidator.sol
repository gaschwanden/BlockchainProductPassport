pragma solidity ^0.4.16;
import "./Measurements.sol";
import "./RangeRequirements.sol";

contract RangeValidator {
    function RangeValidator(){
    }
    RangeRequirements requirements;
    Measurements measurements;

    function isMeasurementValid(uint i) constant returns (bool){
        int value;
		bytes32 attributeName;
        uint decimals;
        int min;
        int max;
        // value=measurements.getNameAndValeOfMeasurement(i).value;
        (attributeName,value)=measurements.getNameAndValeOfMeasurement(i);
        (attributeName,decimals,min,max)=requirements.getAttributeByName(attributeName);
        if(value>=min && value<=max){
            return true;
        }else return false;
    }


    function isValid() constant returns (bool){
      
        for(uint i=0;i<requirements.getLength();i++){
            if(!isMeasurementValid(i)){
                return false;
            }
        }
        return true;  
    }
}
