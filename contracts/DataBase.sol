pragma solidity ^0.4.7;

import "./authority/Owned.sol";

contract Database is Owned {
  address[] public products;
  struct Handler {
    string _name;
    string _additionalInformation;
  }
  mapping(address => Handler) public addressToHandler;

  /* @notice Constructor to create a Database */
  function Database() {}

  function () {
    throw;
  }

  /* @notice Function to add a Handler reference
     @param _address address of the handler
     @param _name The name of the Handler
     @param _additionalInformation Additional information about the Product,
            generally as a JSON object. */
  function addHandler(address _address, string _name, string _additionalInformation) onlyOwner {
    Handler memory handler;
    handler._name = _name;
    handler._additionalInformation = _additionalInformation;

    addressToHandler[_address] = handler;
  }

  /* @notice Function to add a product reference
     @param productAddress address of the product */
  function storeProductReference(address productAddress) {
    products.push(productAddress);
  }
  function  getProductReference() public constant returns (address[]){
    return products;
  }

}
