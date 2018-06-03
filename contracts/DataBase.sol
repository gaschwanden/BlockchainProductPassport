pragma solidity ^0.4.7;

import "./authority/Owned.sol";

contract Database is Owned {

  address[] public products;

  struct Handler {
    string _name;
    string _additionalInformation;
  }

  function Database() {}

  function () {
    throw;
  }

  function storeProductReference(address productAddress) {
    products.push(productAddress);
  }
  function  getProductReference() public constant returns (address[]){
    return products;
  }

}
