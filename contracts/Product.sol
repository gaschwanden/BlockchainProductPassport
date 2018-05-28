pragma solidity ^0.4.16;
import "./Measurements.sol";
import "./authority/Owned.sol";
import "./Database.sol";

contract Product {

    address public PRODUCT_FACTORY;
    address public DATABASE_CONTRACT;
    struct Action {
        address handler;
        bytes32 description;
        uint lon;
        uint lat;
        uint timestamp;
        uint blockNumber;
    }

    struct Attribute {
        bytes32 attributeName;
        uint value;
    }

    Attribute [] public attributes;
    Measurements [] public measurements;
    Action[] public actions;

    modifier notConsumed {
        if (isConsumed)
            throw;
        _;
    }

    function setAttributes(bytes32 [] _attributeName, uint [] _values)   {
        if (_attributeName.length != _values.length) throw;
        for (uint i = 0; i < _attributeName.length; i++) {
            attributes.push(Attribute(_attributeName[i], _values[i]));
        }
    }

    function getAttributes() constant returns (bytes32 [], uint []) {
        bytes32 [] memory attributeNames = new bytes32[](attributes.length);
        uint [] memory values = new uint[](attributes.length);
        for (uint i = 0; i < attributes.length; i++) {
            attributeNames[i] = attributes[i].attributeName;
            //productNamesList.push(attributeNames[i]);
            values[i] = attributes[i].value;
            //productValuesList.push(values[i]);
        }
        return (attributeNames,values);
    }

    function getAttributeByName(bytes32 _name) constant returns (bytes32 , uint ) {
        bytes32 name;
        uint value;
        for (uint i = 0; i < attributes.length; i++) {
            if(attributes[i].attributeName == _name){
                value = attributes[i].value;
                return (_name,value);
            }
        }
    }

    function getAttributeNames() constant returns (bytes32 [] ) {
        bytes32[] names;
        for (uint i = 0; i < attributes.length; i++) {
            names[i]=attributes[i].attributeName;
            
        }
        return names;
    }
    
    function getAttributeValues() constant returns (uint [] ) {
        uint[] values;
        for (uint i = 0; i < attributes.length; i++) {
            values[i]=attributes[i].value;
        }
        return values;
    }

    address[] public parentProducts;
    address[] public childProducts;

    bool public isConsumed;
    bytes32 public name;
    uint public lon;
    uint public lat;
    bytes32 [] attributeNames;
    uint [] values;

    
    event ProductInfo(
        bytes32 name, 
        bytes32[] attributeNames, 
        uint[] values, 
        address[] parentProducts,
        uint lon,
        uint lat,
        address PRODUCT_FACTORY,
        address DATABASE_CONTRACT
        ) ;

    function Product(bytes32 _name, bytes32[] _attributeName, uint[] _values, address[] _parentProducts, uint _lon, uint _lat ,address _DATABASE_CONTRACT,address _PRODUCT_FACTORY) {
        name = _name;
        isConsumed = false;
        parentProducts = _parentProducts;
        attributeNames = _attributeName;
        values = _values;
        //setAttributes(_attributeName,_values);
        PRODUCT_FACTORY = _PRODUCT_FACTORY;
        lon = _lon;
        lat = _lat;
        DATABASE_CONTRACT = _DATABASE_CONTRACT;
        Action memory creation;
        creation.handler = msg.sender;
        creation.description = "Product creation";
        creation.lon = _lon;
        creation.lat = _lat;
        creation.timestamp = now;
        creation.blockNumber = block.number;
        actions.push(creation);
        Database database = Database(DATABASE_CONTRACT);
        database.storeProductReference(this);
    }
   
    function logProductInfo(){
        ProductInfo( name,
            attributeNames,
            values,
            parentProducts,
            lon,
            lat,
            PRODUCT_FACTORY,
            DATABASE_CONTRACT);
        
    }

    function () {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }

    /* @notice Function to add an Action to the product.
       @param _description The description of the Action.
       @param _lon Longitude x10^10 where the Action is done.
       @param _lat Latitude x10^10 where the Action is done.
       @param _newProductNames In case that this Action creates more products from
              this Product, the names of the new products should be provided here.
       @param _newProductsAdditionalInformation In case that this Action creates more products from
              this Product, the additional information of the new products should be provided here.
       @param _consumed True if the product becomes consumed after the action. */
    // bytes32 _name, bytes32[] _attributeName, uint[] _values, address[] _parentProducts, uint _lon, uint _lat, Measurements[] _measurements, address _PRODUCT_FACTORY) {


    function addAction(bytes32 _newProductsNames, bytes32 description, bytes32 []_newAttributeNames,uint[] _newValues,uint lon,uint lat, bool _consumed) notConsumed {


        Action memory action;
        action.handler = msg.sender;
        action.description = description;

        setAttributes(_newAttributeNames,_newValues);


        action.lon = lon;
        action.lat = lat;
        action.timestamp = now;
        action.blockNumber = block.number;

        actions.push(action);

        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);

        address[] memory parentProducts = new address[](1);
        parentProducts[0] = this;
        productFactory.createProduct(_newProductsNames, _newAttributeNames,_newValues, parentProducts, lon, lat, DATABASE_CONTRACT);
        isConsumed = _consumed;
    }

    /* @notice Function to merge some products to build a new one.
       @param otherProducts addresses of the other products to be merged.
       @param newProductsName Name of the new product resulting of the merge.
       @param newProductAdditionalInformation Additional information of the new product resulting of the merge.
       @param _lon Longitude x10^10 where the merge is done.
       @param _lat Latitude x10^10 where the merge is done. */
    function merge(address[] otherProducts, bytes32 newProductName, bytes32[] _newAttributeName, uint[] _newValues, uint lon, uint lat) notConsumed {
        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);
        address newProduct = productFactory.createProduct(newProductName, _newAttributeName,  _newValues, otherProducts, lon, lat,DATABASE_CONTRACT);

        this.collaborateInMerge(newProduct, lon, lat);
        for (uint i = 0; i < otherProducts.length; ++i) {
            Product prod = Product(otherProducts[i]);
            prod.collaborateInMerge(newProduct, lon, lat);
        }
    }

    /* @notice Function to collaborate in a merge with some products to build a new one.
       @param newProductsAddress Address of the new product resulting of the merge. */
    function collaborateInMerge(address newProductAddress, uint lon, uint lat) notConsumed {
        childProducts.push(newProductAddress);

        Action memory action;
        action.handler = this;
        action.description = "Collaborate in merge";
        action.lon = lon;
        action.lat = lat;
        action.timestamp = now;
        action.blockNumber = block.number;
        actions.push(action);

        this.consume();
    }

    /* @notice Function to consume the Product */
    function consume() notConsumed {
        isConsumed = true;
    }
}

/* @title Product Factory Contract
   @author Andreu Rodíguez i Donaire
   @dev This contract represents a product factory which represents products to be tracked in
   the TODO put name of platform ** platform. This product lets the handlers to register actions
   on it or even combine it with other products. */
contract ProductFactory {

    /* @notice Constructor to create a Product Factory */
    function ProductFactory() {}

    function () {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }
    string testele;
    function test1(string input)  public{
        testele=input;
    }
    function gettest1()public constant returns (string){
        return testele;
    }

    function createProduct(bytes32 _name, bytes32[] _newAttributeName, uint [] _newValues, address[] _parentProducts, uint _lon, uint _lat, address DATABASE_CONTRACT) returns(address) {
        return new Product(_name, _newAttributeName,  _newValues, _parentProducts, _lon, _lat, DATABASE_CONTRACT, this);
    }
}
