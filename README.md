# Blockchain ProductPassport

## What is ProductPassport?

ProductPassport is a smart contract framework to use blockchain technology to guarantee the transparency and traceability of product. The whole system and information can be trusted by customers, it is decentralized and fully distributed, immutable system.

## Technologies

### Backend
 - Solidity

### Frontend
 - jQuery
 - Web3.JS
 - truffle-contract


## Structure

The application is divided in two parts

## Backend 
The backend consists of two parts: 
1.	‘contracts’ folder: All smart contracts
2.	‘migrations’ folder: All migration scripts
3.	
## Frontend 
The frontend is located in the ‘web’ folder. The js files are in the ‘asset/js’ directory and the html files in the assets file. 

## Begin

### Prerequisite
The frontend application uses following frameworks which must be installed before running the application
 - NodeJS (to install please follow https://nodejs.org/en/download/)
 - npm 

The backend applications, uses following softwares to be installed
 - Truffle testrpc or Ganache (http://truffleframework.com/)
- MetaMask:
1. Install Firefox or Chrome extension
2. In the top left corner use localhost (if you are running geth locally) or Custom RPC and use parameters form above. (https://metamask.io/)
3. Choose account from Ganache


### Steps to start Blockchain Immigration Web Application
1.	Clone the git.
2.	Install dependencies
    > npm install

 3. Please execute the following command from the project root directory

    > truffle compile	
 4. Open Ganache and MetaMask, and make them link with each other (http://truffleframework.com/docs/advanced/truffle-with-metamask)
5. Depoly contract, open terminal and:
   >truffle migrate --reset --compile-all
 6. From then, the smart contracts have been deployed on the Ethereum blockchain

 7. Please execute the following command from the project root directory to run the lite serer
   >npm run dev
 After that the website will pop up. 

 8. The application is ready to be used.

## Application Usage
There are mainly seven functions in this application:
1.	Create the product and declare the ownership of this product.
2.	Transfer the ownership of the product from one user to another.
3.	Add any action to the products, including moving, processing, splitting the product.
4.	Get the all of attributes of the product, including their previous products.  
5.	Get all the action processed for this product.
6.	Get all of your owned product.
7.	Verify the range of requirement is satisfied. 

All of them can transfer ownership of product and track the information of product. And get all of the products belong to you.
### As a supplier

You can create the product, add action to products, and declare the ownership of product.

### As a courier

You add action to products, like moving the product.

### As a processor
You can split products to different pieces, add actions to products, and validate the attribute value is in range.

### As a user

You can track information and transfer ownership to others.


## How to use

1.	Registration 
a.	Paste the account address and click on registration button.
b.	Wait and then submit your Metamask notation.
c.	When the head title show “Your role is …”. You have already successfully registered. And then go to login page to login.
2.	Login:
a.	Only you have corresponding role, you can login and use services.
3.	Create product:
a.	Input related information that is an example:
i.	ProductName: Cattle
ii.	attributeNames: origin Age Weight Type Gender  //Show split by space
iii.	attributeValues: 1 8 200 3 1 // split by space
iv.	parentProducts : can leave it with empty
v.	longtitude : 40
vi.	latitude : 98
vii.	PRODUCT-FACORY: you can leave it with empty
b.	And then click on create product to create. There will be two notifications to confirm transaction, the first one is creating product and second one is log event. Because the metamask is not stable, merge these two functions maybe give us out of gas error. After two or three times click on confirm. (please waiting more than 10 seconds for each transactions thanks :) )Your product has been successfully created. 
4.	Track 
a.	You can get all products which is only belong to yourselves by clicking on ‘Get your personal productList’ button. And your product list will show under the button.
b.	You can copy that product address and enter the input form to get All the action in this product by clicking on ‘getAction’. You can get this product information by clicking on ‘Get product information by address’. You can track all information by click on ‘Track all information by product address’, including parents products. And after get all information, you can refresh the page and see the product is marked in the google map.
5.	Add action
a.	It is similar with creating product, but don’t input too many attributes, because of Metamask, it will have some bugs. And the example is following:
i.	ProductName: Cattle
ii.	ActionName : move
iii.	attributeNames: origin Age Weight //Show split by space
iv.	attributeValues: 1 8 200 // split by space
v.	parentProducts : //can leave it with empty
vi.	longtitude : 10
vii.	latitude :15
viii.	PRODUCT-FACORY: you can leave it with empty
b.	You can track this action in the Track pages, input address and get the table
6.	Split Product
a.	It is similar with adding action, but also don’t input too many attributes, you can input more than one product name that the origin product will be marked as consumed. Because of Metamask, it will have some bugs, when you input to many attributes, keep it 2 or 3 is easy. And the example is following:
i.	ProductAdderss : // input your product which will be split
ii.	Description about action: split 
iii.	ProductName: beef steak
iv.	attributeNames: origin Age Weight //Show split by space
v.	attributeValues: 1 8 10 // split by space
vi.	parentProducts : //can leave it with empty
vii.	longtitude : 45
viii.	latitude :25
ix.	PRODUCT-FACORY: you can leave it with empty
b.	You can track this action in the Track pages, input address and get the table
7.	Transfer Ownership
a.	That is easy, input your product address and who you want to transfer
8.	Validate
a.	Input product address, attributes name and max min value for range in the form. It will give you solution.
Like give 
i.	ProductAdderss : // input your product which will be split
ii.	Description about action: Age Weight
iii.	attributeMax: 1 10   // age range is 1-20 Weight range is 10-20
iv.	attributeMin: 10 20

