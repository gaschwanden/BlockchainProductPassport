pragma solidity ^0.4.16;

contract RangeRequirements{

    struct Attribute {
      bytes32 attributeName;     
      uint decimals;
      int min;
      int max;
    }

	Attribute [] attributes;

    function RangeRequirements(bytes32 _name)  { }

    function setAttributes(bytes32 [] attributeName, uint [] _decimals, int [] _mins, int [] _maxs)  {
        assert(attributeName.length == _mins.length);
        assert(attributeName.length == _decimals.length);
        assert(attributeName.length == _maxs.length);
        for (uint i = 0; i < attributeName.length; i++) {
            attributes.push(Attribute(attributeName[i], _decimals[i], _mins[i], _maxs[i]));
        }
    }

    function getAttributes() constant returns (bytes32 [],  uint [], int [], int []) {
        bytes32 []memory  attributesNames = new bytes32[](attributes.length);
        uint []memory  decimals = new uint[](attributes.length);
        int [] memory mins = new int[](attributes.length);
        int [] memory maxs = new int[](attributes.length);
        for (uint i = 0; i < attributes.length; i++) {
            attributesNames[i] = attributes[i].attributeName;
            decimals[i] = attributes[i].decimals;
            mins[i] = attributes[i].min;
            maxs[i] = attributes[i].max;
        }
        return (attributesNames, decimals, mins, maxs);
    }

    function getLength() constant returns (uint) {
        return attributes.length;
    }

    function getAttributeByName(bytes32 atName) constant returns (bytes32, uint, int, int) {
        for (uint i = 0; i < attributes.length; i++) {
            if (attributes[i].attributeName == atName) {
                return (attributes[i].attributeName, attributes[i].decimals, attributes[i].min, attributes[i].max);
            }
        }
    }


}
