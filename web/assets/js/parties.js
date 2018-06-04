

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
      App.deployParites();
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
              deployParites: function() {
                $.getJSON("../build/contracts/Parties.json", function(parties) {
                  // Instantiate a new truffle contract from the artifact
                  App.contracts.Parties = TruffleContract(parties);
                  // Connect provider to interact with contract
                  App.contracts.Parties.setProvider(App.web3Provider);
                 
                  //App.listenForEvents();
                  // deployParites
                   return App.render3();
                });
              },
              render3: function() {

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
                App.contracts.Parties.deployed().then(function(instance) {
                  partiesInstance = instance;
                  return partiesInstance;   
                }).then(function(result){
                    console.log(result);
                }).catch(function(error) {
                  console.warn(error);
                });
              },
              getparties: function(){
                App.contracts.Parties.deployed().then(function(instance) {
                  partiesInstance = instance;
                  console.log('result1')
                    return partiesInstance;
                }).then(function(partiesInstance){
                  var invite=['0x52d9775ec01662ef46c1aa8d605a5d1cf9815624','0x5677d98b011f4c3436eb712f447299175daa1c51'];
                  var amounts=[1,2];
                 // return partiesInstance.inviteParties(invite,amounts ,{ gas: '4700000'});
                return partiesInstance.getParticipants();
                //   console.log('result2')
               
                  
                 })
                 .then(function(result){
                  
                  console.log(result)
                  
                 })
                },
                trade: function(){
                  App.contracts.Parties.deployed().then(function(instance) {
                    partiesInstance = instance;
                    console.log('result1')
                      return partiesInstance;
                  }).then(function(partiesInstance){
                    var invite=['0x52d9775ec01662ef46c1aa8d605a5d1cf9815624','0x5677d98b011f4c3436eb712f447299175daa1c51'];
                    var amounts=[1,2];
                    return partiesInstance.inviteParties(invite,amounts ,{ gas: '4700000'});
               //  return partiesInstance.getParticipants();
                  //   console.log('result2')
                 
                    
                   })
                   .then(function(result){
                   
                    console.log(result)
                   //return  partiesInstance.getParticipants();;
                  
                    
                   })
                  },
                  acceptInvitation: function(){
                    App.contracts.Parties.deployed().then(function(instance) {
                      partiesInstance = instance;
                      console.log('result1')
                        return partiesInstance;
                    }).then(function(partiesInstance){
                      // var invite=['0x52d9775ec01662ef46c1aa8d605a5d1cf9815624','0x5677d98b011f4c3436eb712f447299175daa1c51'];
                      // var amounts=[1,2];
                      //return partiesInstance.inviteParties(invite,amounts ,{ gas: '4700000'});
                     return partiesInstance.getParticipants();
                    //   console.log('result2')
                   
                      
                     })
                     .then(function(result){
                     for(var i=0;i<result[0].length;i++){
                       if(App.account == result[0][i]){
                        partiesInstance.processInvite(result[0][i],true, { gas: '4700000'});
                        console.log(result[0][i])
                         console.log("you are in ")
                       }
                     }
                      console.log(result[0])
                     //return  partiesInstance.getParticipants();;
                    
                      
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
  $("#Parties").click(function() {
    App.trade();
});
$("#getparties").click(function() {
  App.getparties();
});
$("#acceptInvitation").click(function() {
  App.acceptInvitation();
});



  });
  
