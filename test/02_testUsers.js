

var Users = artifacts.require("Users");
var Roles = artifacts.require('Roles')

contract("Test the User contract",function(accounts){
  let roles
  let user
  let usrAccounts
  let userInfromation
  beforeEach(async () => {
    roles = await Roles.deployed()
    user = await Users.deployed() 
  })

  it("Deploy the User Contract and can catch an instance of the User contract",async()=>{
        return Users.new().then(function(instance){
             UserContract = instance;
        });
  });

  it('can set user',async() =>{
      await user.setUser(accounts[4],18,"hao","peng",{from: accounts[0]})
      await user.setUser(accounts[5],19,"Alex","peng",{from: accounts[0]})
      //assert.equal(user.countUsers(),1)
  })

  it('can get user',async() =>{
    userInfromation= await user.getUser(accounts[4])
    console.log(userInfromation)
  })

  it('can getUSers',async()=>{
    usrAccounts=await user.getUsers()
    assert.deepEqual(usrAccounts,[ (accounts[4]),(accounts[5])])
  })







});
