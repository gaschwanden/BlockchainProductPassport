
App = {

    web3Provider: null,
    contracts: {},
    account: '0x0',
    
  
    init: function() {
      var databaselist;
      var databaseInstance;
      var productFactoryInstance;

      var productContract ;
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
    
    listenForEvents: function() {
        productABI =JSON.parse(localStorage.productABI);
        var productContract = web3.eth.contract(productABI);
        var productAddress1 = $("#productAddress").val();
        var productAddress = productAddress1+"";
        var productAddress ="0x42cf5772c5f1e972f0b3b00dcbbcb917b3c7c59b";
        product = productContract.at(productAddress);
        console.log(product);
        product.owner(
           function(error,result){
               console.log("this line successfffffff"+result);
           } 
        );
        product.ProductInfo({}, {
            fromBlock: 0,
            toBlock: 'latest'
          }).watch(function(error, event) {
            console.log("1222")
              if(error){
                  console.log("error        "+error);
              }else{
                console.log("event        "+event);
              }
            console.log("event triggered", event)
            console.log("1111111")
           
                $("#insTrans").html('Block hash: '+ event.blockHash );
                console.log("successfule get event") 
                $("#ProductsName").html("Successful Create your "+web3.toAscii(event.args.name)+ ' And the Info is following' );
                $("#ProductsInfo").html(web3.toAscii(event.args.attributeNames[0]).replace(/\u0000/g, '') + ' is ' + event.args.values[0]+" "+web3.toAscii(event.args.attributeNames[1]).replace(/\u0000/g, '') + ' is ' + event.args.values[1]);
          });
          console.log("333311111");
    },
        logEvent: function(num){
            App.contracts.Database.deployed().then(function(instance) {
                databaseInstance = instance;
                return instance.getProductReference({ from: App.account });
            }).then(function(databaseList){
                productABI =JSON.parse(localStorage.productABI);
                var productContract = web3.eth.contract(productABI);
                for(var i=0;i<num;i++){
                    var j=i+1;
                    product = productContract.at(databaseList[databaseList.length-j]);
                    console.log("this product is    "+databaseList[databaseList.length-j]);
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
                }
               
            })
            },
         getAction: function(){
            App.contracts.Database.deployed().then(function(instance) {
                databaseInstance = instance;
                return instance.getProductReference({ from: App.account });
            }).then(function(databaseList){
                var   productABI =JSON.parse(localStorage.productABI);   
                var productContract = web3.eth.contract(productABI);
                var productAddress1 = $("#productAddress").val();
                var productAddress =productAddress1+"";
                product = productContract.at(productAddress);
                var length;
                product.getActionCount(
                    { from: App.account },
                    function (e,res){
                    if(!e){
                        console.log("actions length is    "+res);
                        var i;
                        for (i=0;i<res;i++){
                            product.getActionByCount(i,
                                { from: App.account },  
                                function (e,res){
                                if(!e){
                                    console.log("the action1 is    "+res[0]);
                                    console.log("the action2 is    "+web3.toAscii(res[1]));
                                    console.log("the action2 is    "+res[2]);
                                    console.log("the action3 is    "+res[3]);
                                    console.log("the action4 is    "+res[4]);
                                    console.log("the action5 is    "+res[5]);

                                } else{   
                                    console.log(e);
                                }
                            });
                        }
                    } else{
                        
                        console.log(e);
                    }
                });
               
                })
             },

        splitProduct: function(){ 
        
        var product;
        
        var databaseaddress=databaseInstance.address;
        App.contracts.ProductFactory.deployed().then(function(instance) {
            productFactoryInstance = instance;
            
            return  databaseInstance.getProductReference({ from: App.account });
//"0x453243779f49e4df8e70e110d8243cb5548e56b7"
        }).then(function(databaseList){
            var productAddress1 = $("#productAddress").val();
            var productAddress =productAddress1+"";
            //var productName = $("#newProductName").val();
            var productName = $("#newProductName").val().split(" ");
            var description =$("#description").val();
            var _newAttributeName = $("#newAttributeName").val().split(" ");
            var _newValues = $("#newValues").val().split(" ");
            var lon = $("#longitude").val();
            var lat = $("#latitude").val();
            productABI =JSON.parse(localStorage.productABI);
             var productContract = web3.eth.contract(productABI);
           // productAddress="0x925dc8429f1e2a671edf986b9159a6db4822a879";
           console.log("productABI  "+productABI);
           console.log("productContract  "+productContract);
            let product2 = productContract.at(productAddress);
            //var productName =["sub1","sub2"];
             let consumed = false;
             console.log("productName  "+productName.length);
             for(var i=0;i<productName.length;i++){
                product2.addAction(
                    productName[i],
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
                 
             }  
            return product2;
        }).then(function(){

        })
        .catch(function(error) {
          console.warn(error);
        });
       
    },
    logOff: function() {          
        var information ="<h3>You have successfully logged out！</h3>'"
        localStorage.infor=information;
        location.reload();
    }




};

 
  
  $(function() {
    $(window).load(function() {
        
      App.init();
    });
    $("#splitProduct").click(function() {
        App.splitProduct();
    });
    $("#getproduct").click(function() {
        App.getproduct();
    });
    $("#getEvent").click(function() {
        App.getEvent();
    });
    $("#getAction").click(function() {
        App.getAction();
    });
    $("#numberOfSubproduct").click(function() {
        App.numberOfSubproduct();
    });
    $("#logOff").click(function() {
        App.logOff();
    });

  })
