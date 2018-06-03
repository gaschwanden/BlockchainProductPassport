

App = {

    web3Provider: null,
    contracts: {},
    account: '0x0',
    init: function() {
      var databaselist;
      var databaseInstance;
      var productFactoryInstance;
      var productABI;
      productABI =JSON.parse(localStorage.productABI);
      var productContract = web3.eth.contract(productABI);
      var getProductContractAddress;
      var productAddress;
      console.log("productAddress   "+productAddress)
      var productAddress = sessionStorage.getItem('productAddress');

      console.log("productContract      "+productContract);
      var productInstance;
      //console.log("productInstance      "+productInstance);


      var information = localStorage.infor;
      $( ".loginInfo" ).append( $.parseHTML(information) );
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
      App.deployDatabase();
      App.deployProductFactory();
      //App.deployProduct();
    },
    
      //deploy database--------------------------------------------------------
    deployDatabase: function() {
        $.getJSON("../build/contracts/Database.json", function(database) {
          // Instantiate a new truffle contract from the artifact
          App.contracts.Database = TruffleContract(database);
          // Connect provider to interact with contract
          App.contracts.Database.setProvider(App.web3Provider);
    
          //App.listenForEvents();
         
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

        // show console in webpages
        // window.console = {
        //     log: function(str){
        //       var node = document.createElement("div");
        //       node.appendChild(document.createTextNode(str));
        //       document.getElementById("myLog").appendChild(node);
        //     }
        //   },
        App.contracts.Database.deployed().then(function(instance) {
          databaseInstance = instance;
          console.log("successfully create contracts");
          console.log("databaseInstance"+databaseInstance);
          console.log("address"+databaseInstance.address);
          console.log("the account is "+App.account);
          return databaseInstance;   
        }).then(function(result){
            console.log(result);
        }).catch(function(error) {
          console.warn(error);
        });
      },
      listenForEvents: function(productAddress) {
        productABI =JSON.parse(localStorage.productABI);
        var productContract = web3.eth.contract(productABI);
        product = productContract.at(productAddress);
        product.ProductInfo({}, {
            fromBlock: 0,
            toBlock: 'latest'
          }).watch(function(error, event) {

            if(error){
              console.log("error        "+error);
          }else{
            console.log("event        "+event);
          }
        console.log("event triggered", event)
            var productName;
            productName=(web3.toAscii(event.args.name).replace(/\u0000/g, ''))+''  ; 
            var  description="transfer owner";
            var  _newAttributeName=[];
            var  _newValues=[];
            var  lon=event.args.lon;
            var lat=event.args.lat;
            var consumed=false;
      
            var productInfors1;
            var productInfors='';    
            var proName;     
            
            for(var i=0;i<event.args.attributeNames.length;i++){   
              _newAttributeName.push(web3.toAscii(event.args.attributeNames[i]).replace(/\u0000/g, ''));
              _newValues.push(event.args.values[i]);
            }

            product.addAction(
              productName,
              description,
              _newAttributeName,
              _newValues,
              lon,
              lat,
              consumed,
              { from: App.account,gas: '4700000' },
                    function (e,contract){
                        console.log(contract);
                  if(!e){
                      console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                  } else{
                      
                      console.log(e);
                  }}
             );
             setTimeout(function(){
              App.logEvent();
            },15000);       
            
           
        });
          console.log("333311111");
    },
    getproduct: function(){
        App.contracts.Database.deployed().then(function(instance) {
            databaseInstance = instance;
            return instance.getProductReference({ from: App.account });
        }).then(function(result){
            console.log("database.address2   "+databaseInstance.address);
            databaselist = result;
            console.log(result);
            return databaseInstance.getProductReference();
        }).catch(function(error) {
          console.warn(error);
        });
    },
   
      //deploy product factory--------------------------------------------------------


    deployProductFactory: function() {
      $.getJSON("../build/contracts/ProductFactory.json", function(factory) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.ProductFactory = TruffleContract(factory);
        // Connect provider to interact with contract
        App.contracts.ProductFactory.setProvider(App.web3Provider);
        return App.render2();
      });
    },
    
    render2: function() {

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
      App.contracts.ProductFactory.deployed().then(function(instance) {
        productFactoryInstance = instance;
        return productFactoryInstance;   
      }).then(function(result){
          console.log(result);
      }).catch(function(error) {
        console.warn(error);
      });
    },
    logEvent: function(){
      App.contracts.Database.deployed().then(function(instance) {
          databaseInstance = instance;
          return instance.getProductReference({ from: App.account });
      }).then(function(databaseList){
          productABI =JSON.parse(localStorage.productABI);
          var productContract = web3.eth.contract(productABI);
          product = productContract.at(databaseList[databaseList.length-1]);
          console.log("this product is    "+databaseList[databaseList.length-1]);
          product.logProductInfo(
          function (e,res){
              if(!e){
                  console.log(res);
                  console.log("the logProductInfo log successfully3")
              } else{
                  
                  console.log(e);
              }
          }
  );
      })
       },
            getOwner: function(){
              App.contracts.Database.deployed().then(function(instance) {
                  databaseInstance = instance;
                  return instance.getProductReference({ from: App.account });
              }).then(function(databaseList){
                productABI =JSON.parse(localStorage.productABI);
                var productContract = web3.eth.contract(productABI);
                  var productAddress1 = $("#productAddress").val();
                  var productAddress = productAddress1+"";
                  product = productContract.at(productAddress);
                  console.log(product)
                  //console.log("Successful Create your "+web3.toAscii(event.args.name)+ ' And the Info is following' );
                  //console.log(web3.toAscii(event.args.attributeNames[0]).replace(/\u0000/g, '') + ' is ' + event.args.values[0]+" "+web3.toAscii(event.args.attributeNames[1]).replace(/\u0000/g, '') + ' is ' + event.args.values[1]);
                  
                
                  product.owner(
                    { gas: '4700000'},
                    function (e,res){
                    if(!e){
                        console.log(res);
                    } else{
                        console.log(e);
                    }
                     });
                  })
               },


            transfer: function(productName,_newAttributeName,_newValues,lon,lat){
            App.contracts.Database.deployed().then(function(instance) {
                databaseInstance = instance;
                return instance.getProductReference({ from: App.account });
            }).then(function(databaseList){
              productABI =JSON.parse(localStorage.productABI);
              var productContract = web3.eth.contract(productABI);
                var productAddress1 = $("#productAddress").val();
                var productAddress = productAddress1+"";
                var productAReceive = $("#receiverAddress").val();
                product = productContract.at(productAddress);
                product.transferOwner(productAReceive,
                { gas: '4700000'},
                function (e,res){
                if(!e){
                    console.log(res);
                } else{
                    console.log(e);
                }
                });
                App.listenForEvents(productAddress,
                  { gas: '4700000'},
                  function (e,res){
                  if(!e){
                      console.log(res);
                  } else{
                      console.log(e);
                  }
                  });
                

                 product.owner(
                { gas: '4700000'},
                function (e,res){
                if(!e){
                    console.log(res);
                } else{
                    console.log(e);
                }
                 });
                })
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
    $("#getproduct").click(function() {
        App.getproduct();
    });
    $("#transfer").click(function() {
        App.transfer();
    });
    $("#getOwner").click(function() {
      App.getOwner();
  });
  $("#logOff").click(function() {
    App.logOff();
});




  });
  
