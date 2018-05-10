var ProductABI = 
[
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "childProducts",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "owner_",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAttributes",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			},
			{
				"name": "",
				"type": "int256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "consume",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newProductsNames",
				"type": "bytes32"
			},
			{
				"name": "description",
				"type": "bytes32"
			},
			{
				"name": "_newAttributeNames",
				"type": "bytes32[]"
			},
			{
				"name": "_newValues",
				"type": "int256[]"
			},
			{
				"name": "lon",
				"type": "int256"
			},
			{
				"name": "lat",
				"type": "int256"
			},
			{
				"name": "_consumed",
				"type": "bool"
			}
		],
		"name": "addAction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "PRODUCT_FACTORY",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "measurements",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isConsumed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "actions",
		"outputs": [
			{
				"name": "handler",
				"type": "address"
			},
			{
				"name": "description",
				"type": "bytes32"
			},
			{
				"name": "lon",
				"type": "int256"
			},
			{
				"name": "lat",
				"type": "int256"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"name": "blockNumber",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "additionalInformation",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "owner_",
				"type": "address"
			}
		],
		"name": "transferOwnerShip",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_attributeName",
				"type": "bytes32[]"
			},
			{
				"name": "_values",
				"type": "int256[]"
			}
		],
		"name": "setAttributes",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newProductAddress",
				"type": "address"
			},
			{
				"name": "lon",
				"type": "int256"
			},
			{
				"name": "lat",
				"type": "int256"
			}
		],
		"name": "collaborateInMerge",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "attributes",
		"outputs": [
			{
				"name": "attributeName",
				"type": "bytes32"
			},
			{
				"name": "value",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "otherProducts",
				"type": "address[]"
			},
			{
				"name": "newProductName",
				"type": "bytes32"
			},
			{
				"name": "_newAttributeName",
				"type": "bytes32[]"
			},
			{
				"name": "_newValues",
				"type": "int256[]"
			},
			{
				"name": "lon",
				"type": "int256"
			},
			{
				"name": "lat",
				"type": "int256"
			}
		],
		"name": "merge",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "parentProducts",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_name",
				"type": "bytes32"
			},
			{
				"name": "_attributeName",
				"type": "bytes32[]"
			},
			{
				"name": "_values",
				"type": "int256[]"
			},
			{
				"name": "_parentProducts",
				"type": "address[]"
			},
			{
				"name": "_lon",
				"type": "int256"
			},
			{
				"name": "_lat",
				"type": "int256"
			},
			{
				"name": "_measurements",
				"type": "address[]"
			},
			{
				"name": "_PRODUCT_FACTORY",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "SetTheOwner",
		"type": "event"
	}
]