export const configuration = {
  "address": "0x33B0C078d85b61D1E8381b82A6eAbC847E0947f7",
  "abi":  [
    {
      "anonymous": false,
      "inputs": [],
      "name": "OwnerWins",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "PlayerWins",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Tie",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "ownerGuessHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "player",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "playerGuess",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "playerStake",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "source",
          "type": "string"
        }
      ],
      "name": "stringToBytes32",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "result",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "a",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "b",
          "type": "string"
        }
      ],
      "name": "compareStrings",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_bytes32",
          "type": "bytes32"
        }
      ],
      "name": "bytes32ToStr",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "fundContract",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ownerGuessHash",
          "type": "string"
        }
      ],
      "name": "createGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_playerGuess",
          "type": "string"
        }
      ],
      "name": "play",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ownerGuessSalt",
          "type": "string"
        }
      ],
      "name": "endGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
}