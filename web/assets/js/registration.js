
App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    init: function() {
    var productABI =[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"childProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"addAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributes","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_otherProducts","type":"address[]"},{"name":"_newProductName","type":"bytes32"},{"name":"_newAttributeName","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"}],"name":"merge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DATABASE_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductAddress","type":"address"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"}],"name":"addMergeAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"getAttributeByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lat","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getActionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRODUCT_FACTORY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"}],"name":"setAttributes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isConsumed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"actions","outputs":[{"name":"handler","type":"address"},{"name":"description","type":"bytes32"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getActionByCount","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attributes","outputs":[{"name":"attributeName","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32[]"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"splitProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"parentProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"},{"name":"_parentProducts","type":"address[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"},{"name":"_DATABASE_CONTRACT","type":"address"},{"name":"_PRODUCT_FACTORY","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"attributeNames","type":"bytes32[]"},{"indexed":false,"name":"values","type":"uint256[]"},{"indexed":false,"name":"parentProducts","type":"address[]"},{"indexed":false,"name":"lon","type":"uint256"},{"indexed":false,"name":"lat","type":"uint256"},{"indexed":false,"name":"PRODUCT_FACTORY","type":"address"},{"indexed":false,"name":"DATABASE_CONTRACT","type":"address"}],"name":"ProductInfo","type":"event"}];
        
    localStorage.productABI=JSON.stringify(productABI);
      var rolesInstance;     
      var productAddress = sessionStorage.getItem('productAddress');
      App.initWeb3();
      var information = localStorage.infor
        $( ".loginInfo" ).append( $.parseHTML(information));
    },
  
    initWeb3: function() {
      // TODO: refactor conditional
      if (typeof web3 !== 'undefined') {
        // If a web3 instance is already provided by Meta Mask.
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
        // Specify default instance if no web3 instance provided
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        web3 = new Web3(App.web3Provider);
      }
      App.deployRoles();
    },
      //deploy Roles--------------------------------------------------------
      deployRoles: function() {
        $.getJSON("../build/contracts/Roles.json", function(roles) {
          // Instantiate a new truffle contract from the artifact
          App.contracts.Roles = TruffleContract(roles);
          // Connect provider to interact with contract
          App.contracts.Roles.setProvider(App.web3Provider);         
          return App.render();
        });
      },
      render: function() {
        var loader = $("#loader");
        var content = $("#content");
        loader.show();
        content.hide();
        // Load account data
        web3.eth.getCoinbase(function(err, account) {
          if (err === null) {
            App.account = account;
            $("#accountAddress").html("Your Account: " + account);
            
            console.log(account);
          }
        });

        App.contracts.Roles.deployed().then(function(instance) {
            rolesInstance = instance;
          console.log("successfully create rolesInstance");
          console.log("rolesInstance"+rolesInstance);
          console.log("address"+rolesInstance.address);
          console.log("the account is "+App.account);
          return rolesInstance;   
        }).then(function(rolesInstance){
           
           
            console.log(rolesInstance);
            
        }).catch(function(error) {
          console.warn(error);
        });
      },
     
      User: function() {   
        var infor='<h3>Your role is</h3>';
        App.contracts.Roles.deployed().then(function(instance) {
            rolesInstance = instance;
            return  rolesInstance;
        }).then(function(rolesInstance){
            console.log("the logProductInfo log successfully3")
            var userAddress1 = $("#userAddress").val();
            var userAddress =userAddress1+"";
            infor=infor+'<h3>Users</h3>';
            localStorage.infor = infor;
            rolesInstance.grantUserRole("User",userAddress);
            setTimeout(function () {
                location.reload()
            }, 1300);
           
        })
        .catch(function(error) {
          console.warn(error);
        })
    },
    logOff: function() {          
        var information ="<h3>You have successfully logged out！</h3>'"
        localStorage.infor=information;
        location.reload();
    },
    Courier: function() {  
        var infor='<h3>Your role is</h3>';
        App.contracts.Roles.deployed().then(function(instance) {
            rolesInstance = instance;
            return  rolesInstance;
        }).then(function(rolesInstance){
            var userAddress1 = $("#userAddress").val();
            var userAddress =userAddress1+"";
            rolesInstance.grantUserRole("Courier",userAddress);
            infor=infor+'<h3>Courier</h3>';
            localStorage.infor = infor;
            setTimeout(function () {
                location.reload()
            }, 1000);
        })
        .catch(function(error) {
          console.warn(error);
        })
    },
    Modifier: function() {  
        var infor='<h3>Your role is</h3>';
        App.contracts.Roles.deployed().then(function(instance) {
            rolesInstance = instance;
            return  rolesInstance;
        }).then(function(rolesInstance){
            var userAddress1 = $("#userAddress").val();
            var userAddress =userAddress1+"";
            rolesInstance.grantUserRole("Modifier",userAddress);
            infor=infor+'<h3>Modifier</h3>';
            localStorage.infor = infor;
            setTimeout(function () {
                location.reload()
            }, 1000);
        })
        .catch(function(error) {
          console.warn(error);
        })
    },
    Supplier: function() {  
        var infor='<h3>Your role is</h3>';
        App.contracts.Roles.deployed().then(function(instance) {
            rolesInstance = instance;
            return  rolesInstance;
        }).then(function(rolesInstance){
            var userAddress1 = $("#userAddress").val();
            var userAddress =userAddress1+"";
            rolesInstance.grantUserRole("Supplier",userAddress);
            //rolesInstance.revokeUserRole("Supplier",userAddress);
            infor=infor+'<h3>Supplier</h3>';
            localStorage.infor = infor;
            
            // setTimeout(function () {
            //     location.reload()
            // }, 1000);
        })
        .catch(function(error) {
          console.warn(error);
        })
    }
        

};


  $(function() {
   
    $(window).load(function() {
       
      App.init();
    });
    $("#User").click(function() {
        App.User();
    });
    $("#Courier").click(function() {
        App.Courier();
    });
    $("#Modifier").click(function() {
        App.Modifier();
    });
    $("#Supplier").click(function() {
        App.Supplier();
    });
    $("#checkYourRoles").click(function() {
        App.checkYourRoles();
    });
    $("#logOff").click(function() {
        App.logOff();
    });

    
    
  })
