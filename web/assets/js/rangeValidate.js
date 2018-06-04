

App = {

    web3Provider: null,
    contracts: {},
    account: '0x0',
    init: function() {
      var databaselist;
      var databaseInstance;
      
      var productFactoryInstance;
      var  productABI =JSON.parse(localStorage.productABI);
      var productContract = web3.eth.contract(productABI);
      var getProductContractAddress;
      var productAddress;
      console.log("productAddress   "+productAddress)
      var productAddress = sessionStorage.getItem('productAddress');
      
      var information = localStorage.infor
      $( ".loginInfo" ).append( $.parseHTML(information) );



      console.log("productContract      "+productContract);
      var productInstance;
      //console.log("productInstance      "+productInstance);
      App.initWeb3();
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
      App.deployRangeRequirements();
     // App.deployRangeValidate();
    },
    deployRangeRequirements: function() {
        $.getJSON("../build/contracts/RangeRequirements.json", function(range) {
          // Instantiate a new truffle contract from the artifact
          App.contracts.RangeRequirements = TruffleContract(range);
          // Connect provider to interact with contract
          App.contracts.RangeRequirements.setProvider(App.web3Provider);
        });
      },
      deployRangeValidate: function() {
        $.getJSON("../build/contracts/Database.json", function(database) {
          // Instantiate a new truffle contract from the artifact
          App.contracts.Database = TruffleContract(database);
          // Connect provider to interact with contract
          App.contracts.Database.setProvider(App.web3Provider);
    
        });
      },
     check: function() {
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
              App.account = account;
              $("#accountAddress").html("Your Account: " + account);
              console.log(account);
            }
          });
         
      App.contracts.RangeRequirements.deployed().then(function(instance) {
        RangeRequirementsInstance = instance;
        return RangeRequirementsInstance;   
      }).then(function(RangeRequirementsInstance){
        // var attributeName = $("#attributeName").val().split(" ");
        // var maxValues = $("#maxValues").val().split(" ");
        // var minValues = $("#minValues").val().split(" ");
       
        //setAttributes
        return RangeRequirementsInstance.getAttributes(
            { from: App.account,gas: '4700000' }); 
       
      })
      .then(function(result){
        var productAddress1 = $("#productAddress").val();
        var productAddress = productAddress1+"";
        //var productAddress ='0x8e0c0df488fca3a98c31c2d414d61966a9a1ef63';
        productABI =JSON.parse(localStorage.productABI);
        var productContract = web3.eth.contract(productABI);
        product = productContract.at(productAddress);
        var flag=true;
        for(var i=0;i<result[0].length;i++){
            var min=result[1][i];
            var max=result[2][i];
            var attriName=web3.toAscii(result[0][i]).replace(/\u0000/g, '');
            
            var productValue=product.getAttributeByName(attriName,
                function(error,result){
                    if(error){
                        console.log(error);
                    }else{
                      console.log("  max "+max+' min '+min)   
                      console.log("111111111111111111111111111111") 
                      console.log("the res11 is "+result[1]);
                      if(result[1]>max||result[1]<min){
                        flag=false;
                        console.log("this is false !!!!!!")
                       
                        
                  }
                    }
                  
            console.log(i+" attribute is "+attriName)
            console.log(i+" product value is "+productValue)
            
            });          
        }  
        setTimeout(() => {
          $(".validate>h3").remove()
              var str='<h3>your product is in range</h3>'
              var str2='<h3>your product is not in range</h3>'
              var st
              if(flag){
                  st=str;
              }else{
                  st=str2;
              }
              $( ".validate" ).append( $.parseHTML(st) );
              }, 2000);
        
      })
      .catch(function(error) {
        console.warn(error);
      });
        
    },


    range: function() {
        web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Your Account: " + account);
          console.log(account);
        }
      });
      App.contracts.RangeRequirements.deployed().then(function(instance) {
        RangeRequirementsInstance = instance;
        return RangeRequirementsInstance;   
      }).then(function(RangeRequirementsInstance){
        var attributeName = $("#attributeName").val().split(" ");
        var maxValues = $("#maxValues").val().split(" ");
        var minValues = $("#minValues").val().split(" ");
        // var attributeName =['sub11','sub22'];
        // var minValues =[1,1];
        // var maxValues = [20,40];
        //setAttributes
        return RangeRequirementsInstance.setAttributes(attributeName,minValues,maxValues,
            { from: App.account,gas: '4700000' });
      })
      .then(function(result){
        console.log("new attri      "+result);
      })
      .catch(function(error) {
        console.warn(error);
      });
        
    },
    logOff: function() {          
        var information ="<h3>You have successfully logged out！</h3>'"
        localStorage.infor=information;
        location.reload();
    },
      
};

  
  $(function() {
    $(window).load(function() {  
      App.init();
    });
    $("#logOff").click(function() {
        App.logOff();
    });
    $("#range").click(function() {
        App.range();
    });
    $("#check").click(function() {
        App.check();
    });

  });
  

