
App = {

    web3Provider: null,
    contracts: {},
    account: '0x0',
    init: function() {
      var databaselist;
      console.log("databaselist     "+databaselist);
      var databaseInstance;
      var productFactoryInstance;
      var productABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"childProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"addAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"logProductInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributes","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"otherProducts","type":"address[]"},{"name":"newProductName","type":"bytes32"},{"name":"_newAttributeName","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"merge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"consume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DATABASE_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"getAttributeByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeNames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lat","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRODUCT_FACTORY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"}],"name":"setAttributes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"measurements","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isConsumed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"actions","outputs":[{"name":"handler","type":"address"},{"name":"description","type":"bytes32"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newProductAddress","type":"address"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"collaborateInMerge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeValues","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attributes","outputs":[{"name":"attributeName","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"parentProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"},{"name":"_parentProducts","type":"address[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"},{"name":"_DATABASE_CONTRACT","type":"address"},{"name":"_PRODUCT_FACTORY","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"attributeNames","type":"bytes32[]"},{"indexed":false,"name":"values","type":"uint256[]"},{"indexed":false,"name":"parentProducts","type":"address[]"},{"indexed":false,"name":"lon","type":"uint256"},{"indexed":false,"name":"lat","type":"uint256"},{"indexed":false,"name":"PRODUCT_FACTORY","type":"address"},{"indexed":false,"name":"DATABASE_CONTRACT","type":"address"}],"name":"ProductInfo","type":"event"}];
      var productContract = web3.eth.contract(productABI);
      var getProductContractAddress;
      var productAddress;
      console.log("productAddress   "+productAddress)
      var productAddress = sessionStorage.getItem('productAddress');

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
      //database function
    addhandler: function(){
        App.contracts.Database.deployed().then(function(instance) {
            databaseInstance = instance;
            return instance.addHandler(
                App.account,
                "Demo Handler",
                "This is an unreal Handler for demo purposes", { from: App.account });
        }).then(function(result){
            console.log(result);
            return databaseInstance.addressToHandler(App.account);
        }).then(function(result){ 
            console.log("database.address2   "+databaseInstance.address);
            console.log("result"+result);
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
    listenForEvents: function(product) {
        product.ProductInfo({}, {
            fromBlock: 0,
            toBlock: 'latest'
          }).watch(function(error, event) {
            console.log("event triggered", event)
            if (event.blockHash != $("#insTrans").html())
				$("#loader").hide();
				$("#insTrans").html('Block hash: '+ event.blockHash );
				console.log("successfule get event") 
				// console.log('myEvent: ' + JSON.stringify(event.args));
				// console.log("with web32"+JSON.stringify("the first attibutes is " + web3.toAscii(event.args.attributeNames[0]).replace(/\u0000/g, '')));
				// console.log("with web33"+event.args.values)
				$("#ProductsName").html("Successful Create your "+web3.toAscii(event.args.name)+ ' And the Info is following' );
				$("#ProductsInfo").html(web3.toAscii(event.args.attributeNames[0]).replace(/\u0000/g, '') + ' is ' + event.args.values[0]+" "+web3.toAscii(event.args.attributeNames[1]).replace(/\u0000/g, '') + ' is ' + event.args.values[1]);

            App.render2();
          });
 
      },
    getEvent: function(){
        App.contracts.Database.deployed().then(function(instance) {
            databaseInstance = instance;
            return instance.getProductReference({ from: App.account });
        }).then(function(databaseList){
            var productABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"childProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"addAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"logProductInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributes","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"otherProducts","type":"address[]"},{"name":"newProductName","type":"bytes32"},{"name":"_newAttributeName","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"merge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"consume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DATABASE_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"getAttributeByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeNames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lat","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRODUCT_FACTORY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"}],"name":"setAttributes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"measurements","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isConsumed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"actions","outputs":[{"name":"handler","type":"address"},{"name":"description","type":"bytes32"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newProductAddress","type":"address"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"collaborateInMerge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeValues","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attributes","outputs":[{"name":"attributeName","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"parentProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"},{"name":"_parentProducts","type":"address[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"},{"name":"_DATABASE_CONTRACT","type":"address"},{"name":"_PRODUCT_FACTORY","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"attributeNames","type":"bytes32[]"},{"indexed":false,"name":"values","type":"uint256[]"},{"indexed":false,"name":"parentProducts","type":"address[]"},{"indexed":false,"name":"lon","type":"uint256"},{"indexed":false,"name":"lat","type":"uint256"},{"indexed":false,"name":"PRODUCT_FACTORY","type":"address"},{"indexed":false,"name":"DATABASE_CONTRACT","type":"address"}],"name":"ProductInfo","type":"event"}];
            var productContract = web3.eth.contract(productABI);
            product = productContract.at(databaseList[databaseList.length-1]);
            product.DATABASE_CONTRACT(
                function (e,res){
                if(!e){
                    console.log(res);
                    console.log("the DATABASE_CONTRACT log successfully2")
                } else{
                    
                    console.log(e);
                }
            });
            
            product.PRODUCT_FACTORY(
                function (e,res){
                if(!e){
                    console.log("attributes "+res);
                    console.log("the attributes log successfully2")
                } else{
                    
                    console.log(e);
                }
            });
            product.actions(0,
                function (e,res){
                if(!e){
                    console.log("actions    "+res);
                    console.log("the actions log successfully2")
                } else{
                    
                    console.log(e);
                }
            });
            product.isConsumed(
                function (e,res){
                if(!e){
                    console.log("isConsumed？    "+res);
                    console.log("the isConsumed log successfully")
                } else{
                    
                    console.log(e);
                }
            });
            App.listenForEvents(product);
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
    createProduct: function(){ 
        var productName = $("#ProductName").val();
		var _newAttributeName = $("#attributeNames").val().split(" ");
		var _newValues = $("#values").val().split(" ");
		var parentProducts =$("#parentProducts").val().split(" ");
		var lon = $("#longitude").val();
		var lat = $("#latitude").val();
       var product;
      var databaseaddress=databaseInstance.address;
        App.contracts.ProductFactory.deployed().then(function(instance) {
            productFactoryInstance = instance;
            var productI= productFactoryInstance.createProduct(
                productName,
                _newAttributeName,
                _newValues,
                parentProducts,
                lon,
                lat,
                databaseaddress, 
                { from: App.account,gas: '4700000' },
               );
            return  databaseInstance.getProductReference({ from: App.account });

        }).then(function(databaseList){
            var productABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"childProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"addAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"logProductInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributes","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"otherProducts","type":"address[]"},{"name":"newProductName","type":"bytes32"},{"name":"_newAttributeName","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"merge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"consume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DATABASE_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"getAttributeByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeNames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lat","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRODUCT_FACTORY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"}],"name":"setAttributes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"measurements","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isConsumed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"actions","outputs":[{"name":"handler","type":"address"},{"name":"description","type":"bytes32"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newProductAddress","type":"address"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"collaborateInMerge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeValues","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attributes","outputs":[{"name":"attributeName","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"parentProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"},{"name":"_parentProducts","type":"address[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"},{"name":"_DATABASE_CONTRACT","type":"address"},{"name":"_PRODUCT_FACTORY","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"attributeNames","type":"bytes32[]"},{"indexed":false,"name":"values","type":"uint256[]"},{"indexed":false,"name":"parentProducts","type":"address[]"},{"indexed":false,"name":"lon","type":"uint256"},{"indexed":false,"name":"lat","type":"uint256"},{"indexed":false,"name":"PRODUCT_FACTORY","type":"address"},{"indexed":false,"name":"DATABASE_CONTRACT","type":"address"}],"name":"ProductInfo","type":"event"}];
            var productContract = web3.eth.contract(productABI);
            console.log("the new databaseList  length         "+databaseList.length);
            console.log("the new databaseList          "+databaseList[databaseList.length-1]);
            product = productContract.at(databaseList[databaseList.length-1]);
            
            return product;
       
        })
        .catch(function(error) {
          console.warn(error);
        });
       
    }




};


    // castVote: function() {
    //   var candidateId = $('#candidatesSelect').val();
    //   App.contracts.Election.deployed().then(function(instance) {
    //     return instance.vote(candidateId, { from: App.account });
    //   }).then(function(result) {
    //     // Wait for votes to update
    //     $("#content").hide();
    //     $("#loader").show();
    //   }).catch(function(err) {
    //     console.error(err);
    //   });
    // }
 
  
  $(function() {
    $(window).load(function() {
        
      App.init();
    });
    $("#deployDatabase").click(function() {
        App.addhandler();
    });
    $("#createProduct").click(function() {
        App.createProduct();
    });
    $("#getproduct").click(function() {
        App.getproduct();
    });
    $("#getEvent").click(function() {
        App.getEvent();
    });
    

  });