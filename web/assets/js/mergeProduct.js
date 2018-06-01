
App = {

    web3Provider: null,
    contracts: {},
    account: '0x0',
    
  
    init: function() {
      var databaselist;
      console.log("databaselist     "+databaselist);
      var databaseInstance;
      var productFactoryInstance;
      var productABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"childProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"addAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"logProductInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributes","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"otherProducts","type":"address[]"},{"name":"newProductName","type":"bytes32"},{"name":"_newAttributeName","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"merge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"consume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DATABASE_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"getAttributeByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeNames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lat","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getActionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRODUCT_FACTORY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"}],"name":"setAttributes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"measurements","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isConsumed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"actions","outputs":[{"name":"handler","type":"address"},{"name":"description","type":"bytes32"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"transferOwnerShip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getActionByCount","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newProductAddress","type":"address"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"collaborateInMerge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeValues","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attributes","outputs":[{"name":"attributeName","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"parentProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"},{"name":"_parentProducts","type":"address[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"},{"name":"_DATABASE_CONTRACT","type":"address"},{"name":"_PRODUCT_FACTORY","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"attributeNames","type":"bytes32[]"},{"indexed":false,"name":"values","type":"uint256[]"},{"indexed":false,"name":"parentProducts","type":"address[]"},{"indexed":false,"name":"lon","type":"uint256"},{"indexed":false,"name":"lat","type":"uint256"},{"indexed":false,"name":"PRODUCT_FACTORY","type":"address"},{"indexed":false,"name":"DATABASE_CONTRACT","type":"address"}],"name":"ProductInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"SetTheOwner","type":"event"}];
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
				console.log('myEvent: ' + JSON.stringify(event.args));
				console.log("with web32"+JSON.stringify("the first attibutes is " + web3.toAscii(event.args.attributeNames[0]).replace(/\u0000/g, '')));
				console.log("with web33"+event.args.values)

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
            var productABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"childProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"addAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"logProductInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributes","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"otherProducts","type":"address[]"},{"name":"newProductName","type":"bytes32"},{"name":"_newAttributeName","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"merge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"consume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DATABASE_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"getAttributeByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeNames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lat","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getActionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRODUCT_FACTORY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"}],"name":"setAttributes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"measurements","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isConsumed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"actions","outputs":[{"name":"handler","type":"address"},{"name":"description","type":"bytes32"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"transferOwnerShip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getActionByCount","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newProductAddress","type":"address"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"collaborateInMerge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeValues","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attributes","outputs":[{"name":"attributeName","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"parentProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"},{"name":"_parentProducts","type":"address[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"},{"name":"_DATABASE_CONTRACT","type":"address"},{"name":"_PRODUCT_FACTORY","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"attributeNames","type":"bytes32[]"},{"indexed":false,"name":"values","type":"uint256[]"},{"indexed":false,"name":"parentProducts","type":"address[]"},{"indexed":false,"name":"lon","type":"uint256"},{"indexed":false,"name":"lat","type":"uint256"},{"indexed":false,"name":"PRODUCT_FACTORY","type":"address"},{"indexed":false,"name":"DATABASE_CONTRACT","type":"address"}],"name":"ProductInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"SetTheOwner","type":"event"}];
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
      merge: function(){ 
        
        var product;
        
        var databaseaddress=databaseInstance.address;
        App.contracts.ProductFactory.deployed().then(function(instance) {
            productFactoryInstance = instance;
            
            return  databaseInstance.getProductReference({ from: App.account });

        }).then(function(databaseList){
            // var productName = $("#newProductName").val();
            // var _newAttributeName = $("#newAttributeName").val().split(" ");
            // var _newValues = $("#newValues").val().split(" ");
            // var parentProducts =$("#otherProducts").val().split(" ");
            // var lon = $("#longitude").val();
            // var lat = $("#latitude").val();
            //0xa02da8453d6cd23e40c62cadefe6ec6f89140a61
            var productName ="superproduct";
            var _newAttributeName =["attr1","attr2"];
            var _newValues=[1100,1200];
            var parentProducts=["0x9dc894a422a1d7d98eccbc329d32c06e6a4eb4e3","0x448b95400ce9cd8548930bb83594eac58835b0c8"];
            var lon=130;
            var lat =140;
            var productABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"childProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newProductsNames","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"_newAttributeNames","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"_consumed","type":"bool"}],"name":"addAction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"logProductInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributes","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"otherProducts","type":"address[]"},{"name":"newProductName","type":"bytes32"},{"name":"_newAttributeName","type":"bytes32[]"},{"name":"_newValues","type":"uint256[]"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"merge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"consume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DATABASE_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"getAttributeByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeNames","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lat","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getActionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRODUCT_FACTORY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"}],"name":"setAttributes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"measurements","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isConsumed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"actions","outputs":[{"name":"handler","type":"address"},{"name":"description","type":"bytes32"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"transferOwnerShip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getActionByCount","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newProductAddress","type":"address"},{"name":"lon","type":"uint256"},{"name":"lat","type":"uint256"}],"name":"collaborateInMerge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAttributeValues","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"attributes","outputs":[{"name":"attributeName","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"parentProducts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_attributeName","type":"bytes32[]"},{"name":"_values","type":"uint256[]"},{"name":"_parentProducts","type":"address[]"},{"name":"_lon","type":"uint256"},{"name":"_lat","type":"uint256"},{"name":"_DATABASE_CONTRACT","type":"address"},{"name":"_PRODUCT_FACTORY","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"attributeNames","type":"bytes32[]"},{"indexed":false,"name":"values","type":"uint256[]"},{"indexed":false,"name":"parentProducts","type":"address[]"},{"indexed":false,"name":"lon","type":"uint256"},{"indexed":false,"name":"lat","type":"uint256"},{"indexed":false,"name":"PRODUCT_FACTORY","type":"address"},{"indexed":false,"name":"DATABASE_CONTRACT","type":"address"}],"name":"ProductInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"SetTheOwner","type":"event"}];
            var productContract = web3.eth.contract(productABI);
            console.log("the new databaseList  length         "+databaseList.length);
            console.log("the new databaseList          "+databaseList[databaseList.length-1]);
            console.log("parentProducts[0]  "+parentProducts[0]);
            console.log("parentProducts[1]  "+parentProducts[1]);
            let subProduct1 = productContract.at((parentProducts[0]));
            let subProduct2 = productContract.at((parentProducts[1]));
            console.log("otherProducts  "+otherProducts);
            console.log("subProduct1  "+subProduct1);
            console.log("subProduct2  "+subProduct2);
            subProduct2.isConsumed(
                function (e,res){
                if(!e){
                    console.log("the subproduct1 is consumed    "+res);
                
                } else{
                    
                    console.log(e);
                }
            });                   
            subProduct1.merge(
                parentProducts,
                productName,
                _newAttributeName,
                _newValues,
                lon,
                lat,
                { from: App.account,gas: '4700000' },
                function (e,contract){
                    if(!e){
                        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                    } else{
                        
                        console.log(e);
                    }});
            
            App.listenForEvents(subProduct1);
            subProduct1.logProductInfo(
                function (e,res){
                    if(!e){
                        console.log(res);
                        console.log("the logProductInfo log successfully3")
                    } else{
                        
                        console.log(e);
                    }
                }
            );
            
            subProduct1.isConsumed(
                function (e,res){
                if(!e){
                    console.log("the subproduct2 is consumed    "+res);
                
                } else{
                    
                    console.log(e);
                }
            });
            
            subProduct1.PRODUCT_FACTORY(
                function (e,res){
                if(!e){
                    console.log("PRODUCT_FACTORY "+res);
                    console.log("the PRODUCT_FACTORY log successfully2")
                } else{
                    
                    console.log(e);
                }
            });
            subProduct1.childProducts(0,
                function (e,res){
                if(!e){
                    console.log("childProducts    "+res);
                } else{
                    
                    console.log(e);
                }
            });
        
       
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
    $("#merge").click(function() {
        App.merge();
    });
    $("#getproduct").click(function() {
        App.getproduct();
    });
    $("#getEvent").click(function() {
        App.getEvent();
    });


  });
  


    // Listen for events emitted from the contract
    // listenForEvents: function() {
    //   App.contracts.Database.deployed().then(function(instance) {
    //     // Restart Chrome if you are unable to receive this event
    //     // This is a known issue with Metamask
    //     // https://github.com/MetaMask/metamask-extension/issues/2393
    //     instance.votedEvent({}, {
    //       fromBlock: 0,
    //       toBlock: 'latest'
    //     }).watch(function(error, event) {
    //       console.log("event triggered", event)
    //       // Reload when a new vote is recorded
    //       App.render();
    //     });
    //   });
    // },