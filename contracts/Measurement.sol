pragma solidity ^0.4.0;
import "./Product.sol";

// the measurement of products
contract Measurement {

    struct Measurement {
        //This product lets the handlers to register Measurement on it or even combine it with other products
        address handler;
        bytes32 description;
        // The location (Longitude and Latitude)
        int lon;
        int lat;

        // Instant of time when the Measurement is done.
        uint timestamp;
        //v Block when the Measurement is done.
        uint blockNumber;
    }


    modifier notConsumed {
        if (isConsumed)
            throw;
        _;
    }

    function addMeasurement(bytes32 description, int lon, int lat) notConsumed {
        Measurement memory measurement;
        measurement.handler = msg.sender;
        measurement.description = description;
        measurement.lon = lon;
        measurement.lat = lat;
        measurement.timestamp = now;
        measurement.blockNumber = block.number;
        measurement.push(measurement);
    }


    function merge(address[] otherProducts, bytes32 newProductName, bytes32 newProductAdditionalInformation, int lon, int lat) notConsumed {
        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);
        address newProduct = productFactory.createProduct(newProductName, newProductAdditionalInformation, otherProducts, lon, lat, DATABASE_CONTRACT);

        this.collaborateInMerge(newProduct, lon, lat);
        for (uint i = 0; i < otherProducts.length; ++i) {
            Product prod = Product(otherProducts[i]);
            prod.collaborateInMerge(newProduct, lon, lat);
        }
    }


}
