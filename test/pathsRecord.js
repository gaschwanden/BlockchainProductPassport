var PathsRecord = artifacts.require("./PathsRecord.sol");

contract('PathsRecord', (accounts) => {
  it ("path starts as an empty array", () => {
    return PathsRecord.deployed().then((instance) => {
      return instance.getPath.call();
    }).then((points) => {
      assert.equal(points.length, 0, "path doesn't start empty.");
      assert.equal(points.constructor, Array, "path isn't an array.");
    });
  });

  it ("returns an array of all points addresses", () => {
    return PathsRecord.deployed().then((instance) => {
      instance.addpoint(accounts[8]);
      instance.addpoint(accounts[9]);
      return instance.getPath.call();
    }).then((points) => {
      assert.equal(points.length, 2, "points were not correctly inserted into path");
      assert.equal(points[0], accounts[8], "point one was not stored correctly");
      assert.equal(points[1], accounts[9], "point two was not stored correctly");
    });
  });
})
