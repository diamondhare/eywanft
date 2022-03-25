/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestTokenPermit,
  TestTokenPermitInterface,
} from "../TestTokenPermit";

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
];

const _bytecode =
  "0x6101406040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610120523480156200003757600080fd5b5060405162001576380380620015768339810160408190526200005a91620002cb565b604051806040016040528060048152602001634559574160e01b81525080604051806040016040528060018152602001603160f81b81525084848160039080519060200190620000ac92919062000158565b508051620000c290600490602084019062000158565b5050825160209384012082519284019290922060c083815260e08290524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818a0181905281830198909852606081019590955260808086019390935230858301528051808603909201825293909201909252805194019390932090925261010052506200037292505050565b828054620001669062000335565b90600052602060002090601f0160209004810192826200018a5760008555620001d5565b82601f10620001a557805160ff1916838001178555620001d5565b82800160010185558215620001d5579182015b82811115620001d5578251825591602001919060010190620001b8565b50620001e3929150620001e7565b5090565b5b80821115620001e35760008155600101620001e8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200022657600080fd5b81516001600160401b0380821115620002435762000243620001fe565b604051601f8301601f19908116603f011681019082821181831017156200026e576200026e620001fe565b816040528381526020925086838588010111156200028b57600080fd5b600091505b83821015620002af578582018301518183018401529082019062000290565b83821115620002c15760008385830101525b9695505050505050565b60008060408385031215620002df57600080fd5b82516001600160401b0380821115620002f757600080fd5b620003058683870162000214565b935060208501519150808211156200031c57600080fd5b506200032b8582860162000214565b9150509250929050565b600181811c908216806200034a57607f821691505b602082108114156200036c57634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a05160c05160e05161010051610120516111b4620003c260003960006105a801526000610a3601526000610a8501526000610a60015260006109e401526000610a0d01526111b46000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80637ecebe00116100a2578063a457c2d711610071578063a457c2d71461022a578063a9059cbb1461023d578063a918adf514610250578063d505accf14610263578063dd62ed3e1461027657600080fd5b80637ecebe00146101e957806395d89b41146101fc5780639be4e7b2146102045780639dc29fac1461021757600080fd5b8063313ce567116100e9578063313ce567146101815780633644e51514610190578063395093511461019857806340c10f19146101ab57806370a08231146101c057600080fd5b806306fdde031461011b578063095ea7b31461013957806318160ddd1461015c57806323b872dd1461016e575b600080fd5b610123610289565b6040516101309190610f20565b60405180910390f35b61014c610147366004610f91565b61031b565b6040519015158152602001610130565b6002545b604051908152602001610130565b61014c61017c366004610fbb565b610331565b60405160128152602001610130565b6101606103e7565b61014c6101a6366004610f91565b6103f6565b6101be6101b9366004610f91565b61042d565b005b6101606101ce366004610ff7565b6001600160a01b031660009081526020819052604090205490565b6101606101f7366004610ff7565b61043b565b61012361045b565b6101be610212366004610fbb565b61046a565b6101be610225366004610f91565b610493565b61014c610238366004610f91565b61049d565b61014c61024b366004610f91565b6104fa565b6101be61025e366004610fbb565b610507565b6101be610271366004611019565b610554565b61016061028436600461108c565b6106b8565b606060038054610298906110bf565b80601f01602080910402602001604051908101604052809291908181526020018280546102c4906110bf565b80156103115780601f106102e657610100808354040283529160200191610311565b820191906000526020600020905b8154815290600101906020018083116102f457829003601f168201915b5050505050905090565b60006103283384846106e3565b50600192915050565b600061033e848484610808565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156103c85760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6103dc85336103d7868561110a565b6106e3565b506001949350505050565b60006103f16109e0565b905090565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916103289185906103d7908690611121565b6104378282610ad3565b5050565b6001600160a01b0381166000908152600560205260408120545b92915050565b606060048054610298906110bf565b6104748382610ad3565b61048e83838361048487876106b8565b6103d79190611121565b505050565b6104378282610bb2565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156104e15760405162461bcd60e51b81526004016103bf90611139565b6104f033856103d7868561110a565b5060019392505050565b6000610328338484610808565b600061051384846106b8565b9050818110156105355760405162461bcd60e51b81526004016103bf90611139565b61054484846103d7858561110a565b61054e8483610bb2565b50505050565b834211156105a45760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016103bf565b60007f00000000000000000000000000000000000000000000000000000000000000008888886105d38c610d01565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e001604051602081830303815290604052805190602001209050600061062e82610d29565b9050600061063e82878787610d77565b9050896001600160a01b0316816001600160a01b0316146106a15760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016103bf565b6106ac8a8a8a6106e3565b50505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166107455760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103bf565b6001600160a01b0382166107a65760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103bf565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b03831661086c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103bf565b6001600160a01b0382166108ce5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103bf565b6001600160a01b038316600090815260208190526040902054818110156109465760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103bf565b610950828261110a565b6001600160a01b038086166000908152602081905260408082209390935590851681529081208054849290610986908490611121565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516109d291815260200190565b60405180910390a350505050565b60007f0000000000000000000000000000000000000000000000000000000000000000461415610a2f57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6001600160a01b038216610b295760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103bf565b8060026000828254610b3b9190611121565b90915550506001600160a01b03821660009081526020819052604081208054839290610b68908490611121565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610c125760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103bf565b6001600160a01b03821660009081526020819052604090205481811015610c865760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103bf565b610c90828261110a565b6001600160a01b03841660009081526020819052604081209190915560028054849290610cbe90849061110a565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020016107fb565b6001600160a01b03811660009081526005602052604090208054600181018255905b50919050565b6000610455610d366109e0565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0821115610df45760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016103bf565b8360ff16601b1480610e0957508360ff16601c145b610e605760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016103bf565b6040805160008082526020820180845288905260ff871692820192909252606081018590526080810184905260019060a0016020604051602081039080840390855afa158015610eb4573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610f175760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016103bf565b95945050505050565b600060208083528351808285015260005b81811015610f4d57858101830151858201604001528201610f31565b81811115610f5f576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610f8c57600080fd5b919050565b60008060408385031215610fa457600080fd5b610fad83610f75565b946020939093013593505050565b600080600060608486031215610fd057600080fd5b610fd984610f75565b9250610fe760208501610f75565b9150604084013590509250925092565b60006020828403121561100957600080fd5b61101282610f75565b9392505050565b600080600080600080600060e0888a03121561103457600080fd5b61103d88610f75565b965061104b60208901610f75565b95506040880135945060608801359350608088013560ff8116811461106f57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561109f57600080fd5b6110a883610f75565b91506110b660208401610f75565b90509250929050565b600181811c908216806110d357607f821691505b60208210811415610d2357634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008282101561111c5761111c6110f4565b500390565b60008219821115611134576111346110f4565b500190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604082015264207a65726f60d81b60608201526080019056fea26469706673582212207d497252c46e285688f56bf43255ef58289a661ce8a227c4f5e51e546edf119d64736f6c634300080a0033";

type TestTokenPermitConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestTokenPermitConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestTokenPermit__factory extends ContractFactory {
  constructor(...args: TestTokenPermitConstructorParams) {
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
  ): Promise<TestTokenPermit> {
    return super.deploy(
      name_,
      symbol_,
      overrides || {}
    ) as Promise<TestTokenPermit>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): TestTokenPermit {
    return super.attach(address) as TestTokenPermit;
  }
  connect(signer: Signer): TestTokenPermit__factory {
    return super.connect(signer) as TestTokenPermit__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestTokenPermitInterface {
    return new utils.Interface(_abi) as TestTokenPermitInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestTokenPermit {
    return new Contract(address, _abi, signerOrProvider) as TestTokenPermit;
  }
}
