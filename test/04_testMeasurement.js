var Measurements = artifacts.require('Measurements')
var Roles = artifacts.require('Roles')
let utils = require('./utils')


contract('Measurements', function (accounts) {
    let measurements
    const fs = require('fs')
    const fscb = function () { /* nothing to do in fs callback */ }
    before(async () => {
        roles = await Roles.deployed()
        measurements = await Measurements.deployed()
     })
    it('has an admin role', () => {
        return measurements.hasRole('admin')
          .then(hasAdmin => assert.ok(hasAdmin))
    })
    it("should add measurements", async () => {
        await measurements.addMeasurements(
            [accounts[0],accounts[1]],
        	["Volume", "Color"],
        	[22, 777],
        	["delivery", "shipping"],
            ["good","bad"],
            [1491848127,1491848135],
            [1,2]);
      
        let measurementsList = await measurements.getMeasurements([]);
        //console.log("account0",accounts[0])
        //console.log("account1",accounts[1])

        let handlers = (measurementsList[0]);
        //console.log("handlers",handlers)
        let attributes = utils.byte32ArraytoAsciiArray(measurementsList[1]);
        let values = measurementsList[2].map(e => e.toNumber());
        let events = utils.byte32ArraytoAsciiArray(measurementsList[3]);
        let discription = utils.byte32ArraytoAsciiArray(measurementsList[4]);
        let timestamps = measurementsList[5].map(e => e.toNumber());
        let blockNumber = measurementsList[6].map(e => e.toNumber());


        assert.deepEqual(handlers, [accounts[0],accounts[1]]);
        console.log("attributes   ",attributes)
        console.log("attributes")
        attributes.then(function(value) {
            assert.deepEqual(value, ["Volume", "Color"]);
            // expected output: "Success!"
        });

        //assert.deepEqual(attributes, ["Volume", "Color"]);
        assert.deepEqual(values, [22, 777]);
        events.then(function(value) {
            assert.deepEqual(value, ["delivery", "shipping"]);
        });
        discription.then(function(value) {
            assert.deepEqual(value, ["good","bad"]);
        });
       
       
        assert.deepEqual(timestamps, [1491848127,1491848135]);
        assert.deepEqual(blockNumber, [1,2]);
        
    });

})