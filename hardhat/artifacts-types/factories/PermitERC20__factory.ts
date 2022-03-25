/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PermitERC20, PermitERC20Interface } from "../PermitERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnWithAllowanceDecrease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintWithAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101406040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610120523480156200003757600080fd5b506040516200186d3803806200186d8339810160408190526200005a9162000330565b6040518060400160405280600c81526020016b29bcb6b134b7b9b4b9a3a9a760a11b81525080604051806040016040528060018152602001603160f81b81525084846000620000ae620001b960201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35081516200010d906004906020850190620001bd565b50805162000123906005906020840190620001bd565b5050825160209384012082519284019290922060c083815260e08290524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818a018190528183019890985260608101959095526080808601939093523085830152805180860390920182529390920190925280519401939093209092526101005250620003d792505050565b3390565b828054620001cb906200039a565b90600052602060002090601f016020900481019282620001ef57600085556200023a565b82601f106200020a57805160ff19168380011785556200023a565b828001600101855582156200023a579182015b828111156200023a5782518255916020019190600101906200021d565b50620002489291506200024c565b5090565b5b808211156200024857600081556001016200024d565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200028b57600080fd5b81516001600160401b0380821115620002a857620002a862000263565b604051601f8301601f19908116603f01168101908282118183101715620002d357620002d362000263565b81604052838152602092508683858801011115620002f057600080fd5b600091505b83821015620003145785820183015181830184015290820190620002f5565b83821115620003265760008385830101525b9695505050505050565b600080604083850312156200034457600080fd5b82516001600160401b03808211156200035c57600080fd5b6200036a8683870162000279565b935060208501519150808211156200038157600080fd5b50620003908582860162000279565b9150509250929050565b600181811c90821680620003af57607f821691505b60208210811415620003d157634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a05160c05160e051610100516101205161144662000427600039600061071b01526000610c9301526000610ce201526000610cbd01526000610c4101526000610c6a01526114466000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80637ecebe00116100b8578063a457c2d71161007c578063a457c2d71461026e578063a9059cbb14610281578063a918adf514610294578063d505accf146102a7578063dd62ed3e146102ba578063f2fde38b146102cd57600080fd5b80637ecebe00146102125780638da5cb5b1461022557806395d89b41146102405780639be4e7b2146102485780639dc29fac1461025b57600080fd5b80633644e515116100ff5780633644e515146101b157806339509351146101b957806340c10f19146101cc57806370a08231146101e1578063715018a61461020a57600080fd5b806306fdde031461013c578063095ea7b31461015a57806318160ddd1461017d57806323b872dd1461018f578063313ce567146101a2575b600080fd5b6101446102e0565b604051610151919061117d565b60405180910390f35b61016d6101683660046111ee565b610372565b6040519015158152602001610151565b6003545b604051908152602001610151565b61016d61019d366004611218565b610388565b60405160128152602001610151565b61018161043e565b61016d6101c73660046111ee565b61044d565b6101df6101da3660046111ee565b610484565b005b6101816101ef366004611254565b6001600160a01b031660009081526001602052604090205490565b6101df6104bc565b610181610220366004611254565b610530565b6000546040516001600160a01b039091168152602001610151565b610144610550565b6101df610256366004611218565b61055f565b6101df6102693660046111ee565b6105b2565b61016d61027c3660046111ee565b6105e6565b61016d61028f3660046111ee565b610643565b6101df6102a2366004611218565b610650565b6101df6102b5366004611276565b6106c7565b6101816102c83660046112e9565b61082b565b6101df6102db366004611254565b610856565b6060600480546102ef9061131c565b80601f016020809104026020016040519081016040528092919081815260200182805461031b9061131c565b80156103685780601f1061033d57610100808354040283529160200191610368565b820191906000526020600020905b81548152906001019060200180831161034b57829003601f168201915b5050505050905090565b600061037f338484610940565b50600192915050565b6000610395848484610a65565b6001600160a01b03841660009081526002602090815260408083203384529091529020548281101561041f5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b610433853361042e8685611367565b610940565b506001949350505050565b6000610448610c3d565b905090565b3360008181526002602090815260408083206001600160a01b0387168452909152812054909161037f91859061042e90869061137e565b6000546001600160a01b031633146104ae5760405162461bcd60e51b815260040161041690611396565b6104b88282610d30565b5050565b6000546001600160a01b031633146104e65760405162461bcd60e51b815260040161041690611396565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6001600160a01b0381166000908152600660205260408120545b92915050565b6060600580546102ef9061131c565b6000546001600160a01b031633146105895760405162461bcd60e51b815260040161041690611396565b6105938382610d30565b6105ad8383836105a3878761082b565b61042e919061137e565b505050565b6000546001600160a01b031633146105dc5760405162461bcd60e51b815260040161041690611396565b6104b88282610e0f565b3360009081526002602090815260408083206001600160a01b03861684529091528120548281101561062a5760405162461bcd60e51b8152600401610416906113cb565b610639338561042e8685611367565b5060019392505050565b600061037f338484610a65565b6000546001600160a01b0316331461067a5760405162461bcd60e51b815260040161041690611396565b6000610686848461082b565b9050818110156106a85760405162461bcd60e51b8152600401610416906113cb565b6106b7848461042e8585611367565b6106c18483610e0f565b50505050565b834211156107175760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152606401610416565b60007f00000000000000000000000000000000000000000000000000000000000000008888886107468c610f5e565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006107a182610f86565b905060006107b182878787610fd4565b9050896001600160a01b0316816001600160a01b0316146108145760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152606401610416565b61081f8a8a8a610940565b50505050505050505050565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b6000546001600160a01b031633146108805760405162461bcd60e51b815260040161041690611396565b6001600160a01b0381166108e55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610416565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0383166109a25760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610416565b6001600160a01b038216610a035760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610416565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316610ac95760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610416565b6001600160a01b038216610b2b5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610416565b6001600160a01b03831660009081526001602052604090205481811015610ba35760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610416565b610bad8282611367565b6001600160a01b038086166000908152600160205260408082209390935590851681529081208054849290610be390849061137e565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610c2f91815260200190565b60405180910390a350505050565b60007f0000000000000000000000000000000000000000000000000000000000000000461415610c8c57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6001600160a01b038216610d865760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610416565b8060036000828254610d98919061137e565b90915550506001600160a01b03821660009081526001602052604081208054839290610dc590849061137e565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610e6f5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610416565b6001600160a01b03821660009081526001602052604090205481811015610ee35760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610416565b610eed8282611367565b6001600160a01b03841660009081526001602052604081209190915560038054849290610f1b908490611367565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610a58565b6001600160a01b03811660009081526006602052604090208054600181018255905b50919050565b600061054a610f93610c3d565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156110515760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610416565b8360ff16601b148061106657508360ff16601c145b6110bd5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610416565b6040805160008082526020820180845288905260ff871692820192909252606081018590526080810184905260019060a0016020604051602081039080840390855afa158015611111573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166111745760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610416565b95945050505050565b600060208083528351808285015260005b818110156111aa5785810183015185820160400152820161118e565b818111156111bc576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146111e957600080fd5b919050565b6000806040838503121561120157600080fd5b61120a836111d2565b946020939093013593505050565b60008060006060848603121561122d57600080fd5b611236846111d2565b9250611244602085016111d2565b9150604084013590509250925092565b60006020828403121561126657600080fd5b61126f826111d2565b9392505050565b600080600080600080600060e0888a03121561129157600080fd5b61129a886111d2565b96506112a8602089016111d2565b95506040880135945060608801359350608088013560ff811681146112cc57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156112fc57600080fd5b611305836111d2565b9150611313602084016111d2565b90509250929050565b600181811c9082168061133057607f821691505b60208210811415610f8057634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008282101561137957611379611351565b500390565b6000821982111561139157611391611351565b500190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604082015264207a65726f60d81b60608201526080019056fea264697066735822122070f9d40bf4749ea8f012b5d40c81d6c85ffd534310e5d64cb35d2c941711a0ba64736f6c634300080a0033";

type PermitERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PermitERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PermitERC20__factory extends ContractFactory {
  constructor(...args: PermitERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PermitERC20> {
    return super.deploy(
      name_,
      symbol_,
      overrides || {}
    ) as Promise<PermitERC20>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): PermitERC20 {
    return super.attach(address) as PermitERC20;
  }
  connect(signer: Signer): PermitERC20__factory {
    return super.connect(signer) as PermitERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PermitERC20Interface {
    return new utils.Interface(_abi) as PermitERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PermitERC20 {
    return new Contract(address, _abi, signerOrProvider) as PermitERC20;
  }
}
