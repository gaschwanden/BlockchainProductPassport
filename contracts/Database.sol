pragma solidity ^0.4.4;

import "./authority/Owned.sol";
import "./Measurement.sol";


contract Database is Owned, Measurement {

  Measurement public measurements;
  // addresses of the Products referenced in this database
  address[] public products;

  struct Handler {

    string _name;

    string _additionalInformation;
  }

  //  Relates an address with a Handler record.
  mapping(address => Handler) public addressToHandler;

  /*  Constructor to create a Database */
  function Database() {}

  function () {
    throw;
  }

  function addHandler(address _address, string _name, string _additionalInformation) onlyOwner {
    Handler memory handler;
    handler._name = _name;
    handler._additionalInformation = _additionalInformation;
    addressToHandler[_address] = handler;
  }

  function storeProductReference(address productAddress) {
    products.push(productAddress);
  }

}
