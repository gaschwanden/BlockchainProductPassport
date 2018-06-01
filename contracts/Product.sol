pragma solidity ^0.4.16;
import "./Measurements.sol";
import "./authority/Owned.sol";
import "./Database.sol";

contract Product {
    address public owner;
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
    function transferOwner(address owner_) public {
        owner = owner_;
    }
    function getOwner() public returns (address){
       return owner;
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
    function getActionCount() public constant returns(uint) {
        return actions.length;
    }
    function getActionByCount(uint index) public constant returns(address, bytes32, uint,uint,uint,uint) {
        return (actions[index].handler, actions[index].description, actions[index].lon, actions[index].lat, actions[index].timestamp,actions[index].blockNumber);
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

    function Product(address _owner, bytes32 _name, bytes32[] _attributeName, uint[] _values, address[] _parentProducts, uint _lon, uint _lat ,address _DATABASE_CONTRACT,address _PRODUCT_FACTORY) {
        owner = _owner;
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

    function addAction( bytes32 _newProductsNames, bytes32 description, bytes32 []_newAttributeNames,uint[] _newValues,uint lon, uint lat, bool _consumed) notConsumed {


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

    


    function merge(address[] otherProducts, bytes32 newProductName, bytes32[] _newAttributeName, uint[] _newValues, uint lon, uint lat) notConsumed {
        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);
        address newProduct = productFactory.createProduct(newProductName, _newAttributeName,  _newValues, otherProducts, lon, lat,DATABASE_CONTRACT);

        this.collaborateInMerge(newProduct, lon, lat);
        for (uint i = 0; i < otherProducts.length; ++i) {
            Product prod = Product(otherProducts[i]);
            prod.collaborateInMerge(newProduct, lon, lat);
        }
    }

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

contract ProductFactory{
    address public owner;
    
    /* @notice Constructor to create a Product Factory */
    function ProductFactory() {
        owner=msg.sender;
    }

    function () {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }
  

    function createProduct(bytes32 _name, bytes32[] _newAttributeName, uint [] _newValues, address[] _parentProducts, uint _lon, uint _lat, address DATABASE_CONTRACT) returns(address) {
        return new Product(owner,_name, _newAttributeName,  _newValues, _parentProducts, _lon, _lat, DATABASE_CONTRACT, this);
    }
}
