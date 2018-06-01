

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
      
    getproduct: function(){
        App.contracts.Database.deployed().then(function(instance) {
            databaseInstance = instance;
            return instance.getProductReference({ from: App.account });
        }).then(function(result){
            productABI =JSON.parse(localStorage.productABI);
            var productContract = web3.eth.contract(productABI);
            
            console.log("database.address2   "+databaseInstance.address);
            databaselist = result;
           
            var ownerlist=[];
            var currentAccount=App.account+"";
            console.log("App.account    "+App.account);
            for(var i=0;i<databaselist.length;i++){
               
                 product = productContract.at(databaselist[i])
               
                product.owner(
                        function(error,result){
                            var owner=result+'';
                            ownerlist.push(owner);     
                        });
            }
            var mydatabaselist=[];
            setTimeout(function(){
                console.log("ownerlist[i]      add "+ownerlist);
                for(var i=0;i<databaselist.length;i++){
                    console.log("ownerlist[i]   is  "+ownerlist[i])
                    console.log("App.account   is  "+App.account)
                    if(ownerlist[i]==App.account){
                        console.log("databaselist[i]      add "+databaselist[i]);
                        mydatabaselist.push(databaselist[i]);
                    }else{
                        console.log("false")
                    }
                }
                setTimeout(function(){
                    console.log(mydatabaselist.length)
                    console.log("databaselist[i]      add "+mydatabaselist);
                    mydatabaselist='My product list is<br>'+mydatabaselist+'';

                    var str = mydatabaselist.split(",").join('<br>');
                    //var res = mydatabaselist.replace(/,/<br>, '');(',','<br>');
                    setTimeout(function(){
                        $( ".mydatabase" ).append( $.parseHTML(str) );
                    },500);
                    

                    
                },500);
            },500);
          
            // 


            
            return (databaselist,ownerlist);
        }).then(function(databaselist,ownerlist){
           
            
            
           
            // console.log("databaselist[i]      add "+databaselist);
            // console.log("ownerlist[i]      add "+ownerlist);
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
      listenForEvents: function(productAddress) {
        productABI =JSON.parse(localStorage.productABI);
        var productContract = web3.eth.contract(productABI);
        product = productContract.at(productAddress);
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
            var productInfors1;
            var productInfors='';    
            var proName;
            proName=(web3.toAscii(event.args.name).replace(/\u0000/g, ''))+''  ; 
            productInfors1="Your product is       "+proName+"<br>";
            $( ".productInformation1" ).append( $.parseHTML(productInfors1) );
            $( ".productInformation1" ).append( $.parseHTML('And the Infor is following') );
            
            for(var i=0;i<event.args.attributeNames.length;i++){       
                var k=i+1;
                var j=k+'';
                productInfors=productInfors+'No. '+'&nbsp;'+j+'&nbsp;'+'attribute is'+'&nbsp;'+web3.toAscii(event.args.attributeNames[i]).replace(/\u0000/g, '')+'&nbsp;'+'and the value is   '+'&nbsp;'+event.args.values[i]+"<br>";           
               
            }
            for(var i=0;i<event.args.parentProducts.length;i++){
                var k=i+1;
                var j=k+'';
                parentaddress='No.'+'&nbsp;'+j+'&nbsp;'+'parentProducts is'+'&nbsp;'+event.args.parentProducts[i]+'';
                paddress=event.args.parentProducts[i]+'';
                if(event.args.parentProducts[i]!="0x0000000000000000000000000000000000000000"){
                    //App.listenForEvents(paddress);
                }else{
                    console.log("this is the end");
                }
              
                productInfors=productInfors+parentaddress+"<br>";
            }          
            var eventlogtitude='The longtitude is '+'&nbsp;'+event.args.lon+"<br>";
            var eventlatitude='The latitude is '+'&nbsp;'+event.args.lat+"<br>";
            var eventfactory='The factory is '+'&nbsp;'+event.args.PRODUCT_FACTORY+"<br>";
            productInfors=productInfors+eventlogtitude+eventlatitude+eventfactory;
            var productInformation='<p>'+productInfors+'</p>';
            console.log("productInformation     "+productInformation);
            $( ".productInformation1" ).append( $.parseHTML(productInformation) );
           
        });
          console.log("333311111");
    },
    showTrack: function(productAddress) {
       
        var markers;
        productABI =JSON.parse(localStorage.productABI)||[];
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
            var productInfors1;
            var productInfors='';    
            var proName;      
            proName=(web3.toAscii(event.args.name).replace(/\u0000/g, ''))+''  ; 
            productInfors1="Your product is       "+proName+"<br>";
            $( ".productInformation1" ).append( $.parseHTML(productInfors1) );
            $( ".productInformation1" ).append( $.parseHTML('And the Infor is following') );
            //parseFloat() 
           
            for(var i=0;i<event.args.attributeNames.length;i++){       
                var k=i+1;
                var j=k+'';
                productInfors=productInfors+'No. '+'&nbsp;'+j+'&nbsp;'+'attribute is'+'&nbsp;'+web3.toAscii(event.args.attributeNames[i]).replace(/\u0000/g, '')+'&nbsp;'+'and the value is   '+'&nbsp;'+event.args.values[i]+"<br>";           
               
            }
            var oldItems = JSON.parse(localStorage.getItem('markers')) || [];

            for(var i=0;i<event.args.parentProducts.length;i++){
              
                var newItem=
                    {
                      coords:{lat:event.args.lat,lng:event.args.lon},            
                      content:'<p>'+event.args.parentProducts[i]+'</p>'
                    };
                oldItems.push(newItem); 
                var k=i+1;
                var j=k+'';
                parentaddress='No.'+'&nbsp;'+j+'&nbsp;'+'parentProducts is'+'&nbsp;'+event.args.parentProducts[i]+'';
                paddress=event.args.parentProducts[i]+'';
                if(event.args.parentProducts[i]!="0x0000000000000000000000000000000000000000"){
                    
                    App.showTrack(paddress);
                   
                  
                }else{
                    console.log("this is the end");
                }
                
                productInfors=productInfors+parentaddress+"<br>";

            }   
           
            localStorage.setItem('markers', JSON.stringify(oldItems)); 

            var eventlogtitude='The longtitude is '+'&nbsp;'+event.args.lon+"<br>";
            var eventlatitude='The latitude is '+'&nbsp;'+event.args.lat+"<br>";

            var eventfactory='The factory is '+'&nbsp;'+event.args.PRODUCT_FACTORY+"<br>";
            productInfors=productInfors+eventlogtitude+eventlatitude+eventfactory;
            var productInformation='<p>'+productInfors+'</p>';
            console.log("productInformation     "+productInformation);
            $( ".productInformation1" ).append( $.parseHTML(productInformation) );

            
           
        });
          console.log("333311111");
    },
    getProductInformationByadd: function(){
        
        var productAddress1 = $("#productAddress").val();
        var productAddress = productAddress1+"";
        // var productAddress ="0x42cf5772c5f1e972f0b3b00dcbbcb917b3c7c59b";
        App.listenForEvents(productAddress);
    },
    getAll: function(){
        var productAddress1 = $("#productAddress").val();
        var productAddress = productAddress1+"";
        // var productAddress ="0x42cf5772c5f1e972f0b3b00dcbbcb917b3c7c59b";
        localStorage.removeItem("markers");
        App.showTrack(productAddress);
    },
        

           
         getAction: function(){
            App.contracts.Database.deployed().then(function(instance) {
                databaseInstance = instance;
                return instance.getProductReference({ from: App.account });
            }).then(function(databaseList){
                productABI =JSON.parse(localStorage.productABI);        
                var productContract = web3.eth.contract(productABI);
                var productAddress1 = $("#productAddress").val();
                var productAddress = productAddress1+"";
                product = productContract.at(productAddress);
              
                var length;
                var tableForActions='<table border="1" cellspacing="5" cellpadding="6">'+'<tr><td>actions</td><td>actionNames</td><td>lon</td><td>lat</td><td>time</td><td>blocknumber</td></tr>';
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
                                    $("#ProductsName").html("track your product name is "+web3.toAscii(res[1]).replace(/\u0000/g, ''));
                                    tableForActions=tableForActions+'<tr>';
                                    var temaddress =res[0]+"";
                                    tableForActions=tableForActions+'<td>'+temaddress+'</td>';
                                    var temName =web3.toAscii(res[1]).replace(/\u0000/g, '')+'';
                                    tableForActions=tableForActions+'<td>'+temName+'</td>';
                                    var temlon =res[2]+"";
                                    tableForActions=tableForActions+'<td>'+temlon+'</td>';
                                    var temlat =res[3]+"";
                                    tableForActions=tableForActions+'<td>'+temlat+'</td>';
                                    var temtime =res[4]+"";
                                    tableForActions=tableForActions+'<td>'+temtime+'</td>';
                                    var temblockNumber =res[5]+"";
                                    tableForActions=tableForActions+'<td>'+temblockNumber+'</td>';
                                    tableForActions=tableForActions+'</tr>';
                                    console.log("1the address is "+res[0]);
                                    console.log("1the name is "+web3.toAscii(res[1]).replace(/\u0000/g, ''));
                                    console.log("1the lon is "+res[2]);
                                    console.log("1the lat is "+res[3]);
                                    console.log("1the time is "+res[4]);
                                    console.log("1the blockNumber is "+res[5]);
                                    console.log("1the action is    "+res);
                                } else{   
                                    console.log(e);
                                }
                            });
                            
                        }
                    } else{
                        console.log(e);
                    }
                    setTimeout(function(){
                        tableForActions=tableForActions+'</table>';
                        $( ".table" ).append( $.parseHTML(tableForActions) );
                    },500);
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
    $("#getEvent").click(function() {
        App.getProductInformationByadd();
    });
    $("#getAction").click(function() {
        App.getAction();
    });
    $("#getAllProductInformations").click(function() {
        App.getAll();
    });
    


  });
  

