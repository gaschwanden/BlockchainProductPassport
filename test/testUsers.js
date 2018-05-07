var Users = artifacts.require("Users");

contract("Test the User contract",function(account){
    describe("Deploy the User Contract",function(){
        it("Catch an instance of the User contract",function(){
            return Users.new().then(function(instance){
                UserContract = instance;
            });
        });
        
    });
});
