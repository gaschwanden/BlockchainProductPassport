
App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    init: function() {
      var rolesInstance;     
      var productAddress = sessionStorage.getItem('productAddress');
      App.initWeb3();
      var information = localStorage.infor
      $( ".loginInfo" ).append( $.parseHTML(information) );
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
      checkYourRoles: function() {
        localStorage.removeItem("infor");  
      
        var infor='<h3>Your role is</h3>'
        App.contracts.Roles.deployed().then(function(instance) {
            rolesInstance = instance;
            return  rolesInstance;
        }).then(function(rolesInstance){
            var userAddress1 = $("#userAddress").val();
            var userAddress =userAddress1+"";
            

            return rolesInstance.checkUserRole("Modifier",userAddress);
        }).then(function(result){
            if(result){
                console.log("Modifier?   "+result);
                
            }else{
                console.log("loading this part")
                return rolesInstance.checkUserRole("Users",userAddress);
                console.log("loading this part2")
            }
        }).then(function(result){
            if(result){
                console.log("Users?   "+result);
            }else{
                return rolesInstance.checkUserRole("Supplier",userAddress);
            }
        }).then(function(result){
            if(result){
                console.log("Supplier?   "+result);

            }else{
                return rolesInstance.checkUserRole("Courier",userAddress);
            }
        }).then(function(result){
            if(result){
                console.log("Courier?   "+result);
                infor=infor+'<h3>Courier</h3>';
                localStorage.infor = infor;
            }else{
                console.log("Please choose one role   ");
                return Promise.reject();
            }
        })
        .catch(function(error) {
          console.log("choose your role first");
          console.warn(error);
        })
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
            }, 1000);
           
        })
        .catch(function(error) {
          console.warn(error);
        })
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
            infor=infor+'<h3>Supplier</h3>';
            localStorage.infor = infor;
            setTimeout
            setTimeout(function () {
                location.reload()
            }, 1000);
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
    
  })
