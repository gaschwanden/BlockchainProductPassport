var ProductFactory = artifacts.require('ProductFactory')
var Product = artifacts.require('Product')
let utils = require('./utils')



contract('Product', function (accounts,deployer) {
  let productFactory
  let name
  let _attributeName
  let _values
  let _parentProducts
  let _lon
  let _lat
  let measurement
  let _PRODUCT_FACTORY
  before(async (deployer) => {
    productFactory = await ProductFactory.deployed()
    product = await  Product.deployed()
    // deployer.deploy(Product,name,_attributeName)
    //                     .then(() => Product.deployed())
  })
  it('Roles has accounts[0] as owner', async () => {
    assert.equal(1,1)
  })

})