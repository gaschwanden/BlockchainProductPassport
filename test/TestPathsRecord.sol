pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PathsRecord.sol";

contract TestPathsRecord {
  PathsRecord pathsRecord;
  address testAddress1;

  function beforeEach() {
    pathsRecord = PathsRecord(new PathsRecord());
    testAddress1 = 0x16f221f434322a9b639df421af8fbb66d4404fd4;
  }
  //test point Can Be Added To Paths Record And Returns True
  function testAdded(){
    Assert.equal(pathsRecord.addpoint(testAddress1), true, "PathsRecord doesn't return true when a new checkpoint is added.");
  }
  //test Check point Cannot Be Added If Address Is The Same As The Last One And Returns False
  function testIfSame(){
    pathsRecord.addpoint(testAddress1);
    Assert.equal(pathsRecord.addpoint(testAddress1), false, "PathsRecord doesn't return false when a duplicate address is provided.");
  }
  //test Checkpoint Cannot BeEmpty And Returns False
  function testNotEmpty(){
    Assert.equal(pathsRecord.addpoint(0x0), false, "PathsRecord doesn't return false when an empty address is provided.");
  }

}