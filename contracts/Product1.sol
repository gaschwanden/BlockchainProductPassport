pragma solidity ^0.4.7;
import "./Measurements.sol";

contract Product {

    address public PRODUCT_FACTORY;
    struct Action {
        address handler;
        bytes32 description;
        int lon;
        int lat;
        uint timestamp;
        uint blockNumber;
        bytes[] measurements;
    }

    modifier notConsumed {
        if (isConsumed)
            throw;
        _;
    }

    address[] public parentProducts;
    address[] public childProducts;

    bool public isConsumed;
    bytes32 public name;
    bytes32 public additionalInformation;

    Measurements [] public measurements;
    Action[] public actions;

    function Product(bytes32 _name, bytes32 _additionalInformation, address[] _parentProducts, int _lon, int _lat, bytes32[] _measurements, address _PRODUCT_FACTORY) {
        name = _name;
        isConsumed = false;
        parentProducts = _parentProducts;
        additionalInformation = _additionalInformation;
        measurements=_measurements;
        PRODUCT_FACTORY = _PRODUCT_FACTORY;

        Action memory creation;
        creation.handler = msg.sender;
        creation.description = "Product creation";
        creation.lon = _lon;
        creation.lat = _lat;
        creation.timestamp = now;
        creation.blockNumber = block.number;
        creation.measurements =["Initialized measurements"];
        actions.push(creation);
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
    function addAction(bytes32 description, int lon, int lat, bytes32[] newProductsNames, bytes32[] newProductsAdditionalInformation, bool _consumed) notConsumed {
        if (newProductsNames.length != newProductsAdditionalInformation.length) throw;

        Action memory action;
        action.handler = msg.sender;
        action.description = description;
        action.lon = lon;
        action.lat = lat;
        action.timestamp = now;
        action.blockNumber = block.number;

        actions.push(action);

        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);

        for (uint i = 0; i < newProductsNames.length; ++i) {
            address[] memory parentProducts = new address[](1);
            parentProducts[0] = this;
            productFactory.createProduct(newProductsNames[i], newProductsAdditionalInformation[i], parentProducts, lon, lat, measurements);
        }

        isConsumed = _consumed;
    }

    /* @notice Function to merge some products to build a new one.
       @param otherProducts addresses of the other products to be merged.
       @param newProductsName Name of the new product resulting of the merge.
       @param newProductAdditionalInformation Additional information of the new product resulting of the merge.
       @param _lon Longitude x10^10 where the merge is done.
       @param _lat Latitude x10^10 where the merge is done. */
    function merge(address[] otherProducts, bytes32 newProductName, bytes32 newProductAdditionalInformation, int lon, int lat) notConsumed {
        ProductFactory productFactory = ProductFactory(PRODUCT_FACTORY);
        address newProduct = productFactory.createProduct(newProductName, newProductAdditionalInformation, otherProducts, lon, lat, DATABASE_CONTRACT);

        this.collaborateInMerge(newProduct, lon, lat);
        for (uint i = 0; i < otherProducts.length; ++i) {
            Product prod = Product(otherProducts[i]);
            prod.collaborateInMerge(newProduct, lon, lat);
        }
    }

    /* @notice Function to collaborate in a merge with some products to build a new one.
       @param newProductsAddress Address of the new product resulting of the merge. */
    function collaborateInMerge(address newProductAddress, int lon, int lat) notConsumed {
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

    /////////////////
    // Constructor //
    /////////////////

    /* @notice Constructor to create a Product Factory */
    function ProductFactory() {}

    function () {
        // If anyone wants to send Ether to this contract, the transaction gets rejected
        throw;
    }

    function createProduct(bytes32 _name, bytes32 _additionalInformation, address[] _parentProducts, int _lon, int _lat, bytes32 [] _measurements) returns(address) {
        return new Product(_name, _additionalInformation, _parentProducts, _lon, _lat, _measurements, this);
    }
}
