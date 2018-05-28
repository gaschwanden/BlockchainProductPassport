var  UsersABI=  [
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
            "constant": false,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                },
                {
                    "name": "_age",
                    "type": "uint256"
                },
                {
                    "name": "_fName",
                    "type": "bytes16"
                },
                {
                    "name": "_lName",
                    "type": "bytes16"
                }
            ],
            "name": "setUser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "fName",
                    "type": "bytes16"
                },
                {
                    "indexed": false,
                    "name": "lName",
                    "type": "bytes16"
                },
                {
                    "indexed": false,
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "userInfo",
            "type": "event"
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
        },
        {
            "constant": true,
            "inputs": [],
            "name": "countUsers",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
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
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getUser",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "bytes16"
                },
                {
                    "name": "",
                    "type": "bytes16"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getUsers",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
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
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "userAccts",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]