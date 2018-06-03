pragma solidity ^0.4.16;

contract RangeRequirements{
      bytes32 _name;
    struct RangeAttribute {

      bytes32 rangeAttributeName;     
      int min;
      int max;
    }
	RangeAttribute [] rangeAttributes;

    function RangeRequirements()  { }

    function setAttributes(bytes32 [] rangeAttributeName, int [] _mins, int [] _maxs)  {
        assert(rangeAttributeName.length == _mins.length);
       
        assert(rangeAttributeName.length == _maxs.length);
        for (uint i = 0; i < rangeAttributeName.length; i++) {
            rangeAttributes.push(RangeAttribute(rangeAttributeName[i], _mins[i], _maxs[i]));
        }
    }


    function getAttributes() constant returns (bytes32 [],  int [], int []) {
        bytes32 []memory  attributesNames = new bytes32[](rangeAttributes.length);
        int [] memory mins = new int[](rangeAttributes.length);
        int [] memory maxs = new int[](rangeAttributes.length);
        for (uint i = 0; i < rangeAttributes.length; i++) {
            attributesNames[i] = rangeAttributes[i].rangeAttributeName;
            mins[i] = rangeAttributes[i].min;
            maxs[i] = rangeAttributes[i].max;
        }
        return (attributesNames, mins, maxs);
    }

    function getLength() constant returns (uint) {
        return rangeAttributes.length;
    }

    function getAttributeByName(bytes32 atName) constant returns (bytes32, int, int) {
        for (uint i = 0; i < rangeAttributes.length; i++) {
            if (rangeAttributes[i].rangeAttributeName == atName) {
                return (rangeAttributes[i].rangeAttributeName, rangeAttributes[i].min, rangeAttributes[i].max);
            }
        }
    }


}
