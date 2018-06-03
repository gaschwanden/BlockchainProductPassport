pragma solidity ^0.4.16;
import "./Product.sol";
import "./RangeRequirements.sol";

contract RangeValidator {
   
    RangeRequirements requirements;
    Product products;

    function RangeValidator(Product _product, RangeRequirements _requirements) {
		requirements = _requirements;
		products = _product;
	}

    // function isAttributeValid() constant returns (bool){
    //     int value;
	// 	bytes32 attributeName;
    //     int min;
    //     int max;
    //     attributeName=products.getAttributes()[0];
    //     value=products.getAttributes()[1];
    //     attributeName=products.getAttributeByName(attributeName)[0];
    //     min=products.getAttributeByName(attributeName)[1];
    //     max=products.getAttributeByName(attributeName)[2];
       
    //     if(value>=min && value<=max){
    //         return true;
    //     }else return false;
    // }


    // function isValid() constant returns (bool){
      
    //     for(uint i=0;i<requirements.getLength();i++){
    //         if(!isAttributeValid()){
    //             return false;
    //         }
    //     }
    //     return true;  
    // }
}
