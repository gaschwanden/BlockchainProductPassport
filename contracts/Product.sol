pragma solidity ^0.4.0;
import "./Database.sol";
contract Product {
    address public databaseContract_;
    address public productFactory_;



    modifier notConsumed {
        if (isConsumed)
            throw;
        _;
    }

    address[] public parentProducts_;
    address[] public childProducts_;
    bool public isConsumed;
    bytes32 public name;
    bytes32 public Id;
    // other information
    bytes32 public additionalInformation;


    Measurement[] public Measurement;

    function Product(bytes32 _name, bytes32 _additionalInformation, address[] _parentProducts, int _lon, int _lat, address _DATABASE_CONTRACT, address _PRODUCT_FACTORY) {
        name = _name;
        isConsumed = false;
        parentProducts = _parentProducts;
        additionalInformation = _additionalInformation;

        databaseContract = _databaseContract;
        productFactoriy = _databaseContract;

        Measurement memory creation;
        creation.handler = msg.sender;
        creation.description = "Product creation";
        creation.lon = _lon;
        creation.lat = _lat;
        creation.timestamp = now;
        creation.blockNumber = block.number;

        actions.push(creation);

        Database database = Database(databaseContract);
        database.storeProductReference(this);
    }


    function merge(address[] otherProducts, bytes32 newProductName, bytes32 newProductAdditionalInformation, int lon, int lat) notConsumed {
        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);
        address newProduct = productFactory.createProduct(newProductName, newProductAdditionalInformation, otherProducts, lon, lat, DATABASE_CONTRACT);

        this.collaborateInMerge(newProduct, lon, lat);
        for (uint i = 0; i < otherProducts.length; i++) {
            Product prod = Product(otherProducts[i]);
            prod.collaborateInMerge(newProduct, lon, lat);
        }
    }


    function collaborateInMerge(address newProductAddress, int lon, int lat) notConsumed {
        childProducts.push(newProductAddress);

        Measurement memory measurement;
        measurement.handler = this;
        measurement.description = "Collaborate in merge";
        measurement.lon = lon;
        measurement.lat = lat;
        measurement.timestamp = now;
        measurement.blockNumber = block.number;

        measurement.push(action);

        this.consume();
    }
    function consume() notConsumed {
    isConsumed = true;
    }
}


contract ProductFactory {
    function ProductFactory() {}

    function () {
        throw;
    }
    function createProduct(bytes32 _name, bytes32 _additionalInformation, address[] _parentProducts, int _lon, int _lat, address databaseContract) returns(address) {
        return new Product(_name, _additionalInformation, _parentProducts, _lon, _lat, databaseContract, this);
    }
}

