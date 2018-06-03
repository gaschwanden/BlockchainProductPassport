pragma solidity ^0.4.16;
import "./authority/Owned.sol";
import "./Database.sol";
import "./authority/Roles.sol";

contract Product is Roles{
    
    address public owner;
    address public PRODUCT_FACTORY;
    address public DATABASE_CONTRACT;
    address[] public parentProducts;
    address[] public childProducts;
    
    bool public isConsumed;
    bytes32 public name;
    bytes32 [] attributeNames;
    uint public lon;
    uint public lat;
    uint [] values;
    
    
    Attribute [] public attributes;
    Action[] public actions;
    
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
    

    event ProductInfo(
        bytes32 name, 
        address owner,
        bytes32[] attributeNames, 
        uint[] values, 
        address[] parentProducts,
        uint lon,
        uint lat,
        address PRODUCT_FACTORY,
        address DATABASE_CONTRACT
        ) ;
    

    modifier notConsumed {
        if (isConsumed)
            throw;
        _;
    }
    function () {
            // If anyone wants to send Ether to this contract, the transaction gets rejected
            throw;
        }

    
    function Product(address _owner, 
        bytes32 _name, 
        bytes32[] _attributeName, 
        uint[] _values, 
        address[] _parentProducts, 
        uint _lon, 
        uint _lat ,
        address _DATABASE_CONTRACT,
        address _PRODUCT_FACTORY) {

        owner = _owner;
        name = _name;
        isConsumed = false;
        parentProducts = _parentProducts;
        attributeNames = _attributeName;
        values = _values;
        setAttributes(_attributeName,_values);
        PRODUCT_FACTORY = _PRODUCT_FACTORY;
        lon = _lon;
        lat = _lat;
        DATABASE_CONTRACT = _DATABASE_CONTRACT;
      
        Action memory firstCreate;
        firstCreate.handler = msg.sender;
        firstCreate.description = "Product creation";
        firstCreate.lon = _lon;
        firstCreate.lat = _lat;
        firstCreate.timestamp = now;
        firstCreate.blockNumber = block.number;
        actions.push(firstCreate);
     
        Database database = Database(DATABASE_CONTRACT);
        database.storeProductReference(this);
        
        ProductInfo( name,
            owner,
            attributeNames,
            values,
            parentProducts,
            lon,
            lat,
            PRODUCT_FACTORY,
            DATABASE_CONTRACT);
    }
     
    function logProductInfo(){
        ProductInfo( name,
            owner,
            attributeNames,
            values,
            parentProducts,
            lon,
            lat,
            PRODUCT_FACTORY,
            DATABASE_CONTRACT);
        
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
            values[i] = attributes[i].value;
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

    
    function getActionCount() public constant returns(uint) {
        return actions.length;
    }
    
    
    
    function getActionByCount(uint index) public constant returns(address, bytes32, uint,uint,uint,uint) {
        return (actions[index].handler, actions[index].description, actions[index].lon, actions[index].lat, actions[index].timestamp,actions[index].blockNumber);
    }
  

    function addAction( bytes32 _newProductsNames, 
        bytes32 description, bytes32 []_newAttributeNames,
        uint[] _newValues,
        uint lon, 
        uint lat, 
        bool _consumed) notConsumed {

        setAttributes(_newAttributeNames,_newValues);
    
        
        Action memory anyAction;
        anyAction.handler = msg.sender;
        anyAction.description = description;
        anyAction.lon = lon;
        anyAction.lat = lat;
        anyAction.timestamp = now;
        anyAction.blockNumber = block.number;

        actions.push(anyAction);


        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);

        address[] memory parentProducts = new address[](1);
        parentProducts[0] = this;
        productFactory.createProduct(msg.sender,_newProductsNames, _newAttributeNames,_newValues, parentProducts, lon, lat, DATABASE_CONTRACT);
        isConsumed = _consumed;
    }
    
    function splitProduct( bytes32[] _newProductsNames, bytes32 description, bytes32 []_newAttributeNames,uint[] _newValues,uint lon, uint lat, bool _consumed) notConsumed {


        Action memory split;
        split.handler = msg.sender;
        split.description = description;
        setAttributes(_newAttributeNames,_newValues);
        split.lon = lon;
        split.lat = lat;
        split.timestamp = now;
        split.blockNumber = block.number;

        actions.push(split);

        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);
        address[] memory parentProducts = new address[](1);
        parentProducts[0] = this;
        for (uint i = 0; i < _newProductsNames.length; ++i) {
            productFactory.createProduct( msg.sender, _newProductsNames[i], _newAttributeNames,_newValues, parentProducts, lon, lat, DATABASE_CONTRACT);
        }


        isConsumed = _consumed;
    }
    

    function merge(address[] _otherProducts, bytes32 _newProductName, bytes32[] _newAttributeName, uint[] _newValues, uint _lon, uint _lat) notConsumed {
        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);
        address _newProduct = productFactory.createProduct(msg.sender,_newProductName, _newAttributeName,  _newValues, _otherProducts, _lon, _lat,DATABASE_CONTRACT);

        this.addMergeAction(_newProduct, _lon, _lat);
        for (uint i = 0; i < _otherProducts.length; ++i) {
            Product prod = Product(_otherProducts[i]);
            prod.addMergeAction(_newProduct, _lon, _lat);
        }
    }

    function addMergeAction(address _newProductAddress, uint _lon, uint _lat) notConsumed {
        childProducts.push(_newProductAddress);

        Action memory merge;
        merge.handler = this;
        merge.description = "Merge the product and create new";
        merge.lon = _lon;
        merge.lat = _lat;
        merge.timestamp = now;
        merge.blockNumber = block.number;
        actions.push(merge);

       isConsumed = true;
    }

  
}

contract ProductFactory is Roles{
    address public owner;
    

    function ProductFactory() {
        owner=msg.sender;
    }

    function () {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }
  

    function createProduct(
        address _owner ,
        bytes32 _name, 
        bytes32[] _newAttributeName, 
        uint [] _newValues, 
        address[] _parentProducts, 
        uint _lon, 
        uint _lat, 
        address DATABASE_CONTRACT)  returns(address) {
        return new Product(_owner,_name, _newAttributeName,  _newValues, _parentProducts, _lon, _lat, DATABASE_CONTRACT, this);
    }
}
