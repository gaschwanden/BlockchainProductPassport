pragma solidity ^0.4.4;

contract PathsRecord {

    address[] public path;
    address public owner;

    function PathsRecord() {
      owner = msg.sender;
    }

    function addpoint(address point) returns (bool) {
      if (point == 0x0) {
        return false;
      }
      if (path.length == 0 || path[path.length-1] != point) {
        path.push(point);
        return true;
      }
      return false;
    }

    function getPath() constant returns (address[]) {
      uint length = path.length;

      address[] memory points = new address[](length);

      for (uint i = 0; i < path.length; i++) {
        points[i] = path[i];
      }

      return points;
    }

    function getPathLength() constant returns (uint) {
      return path.length;
    }

    function destroy() {
        if (owner == msg.sender) selfdestruct(owner);
    }
}