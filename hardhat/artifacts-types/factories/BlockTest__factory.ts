/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BlockTest, BlockTestInterface } from "../BlockTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "chainId",
        type: "uint64",
      },
      {
        internalType: "bytes32",
        name: "prevBlockHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "epochBlockHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "transactionsRoot",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "sourceHeigh",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "height",
        type: "uint64",
      },
    ],
    name: "blockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "blockHeaderRawDataTest",
    outputs: [
      {
        internalType: "bytes32",
        name: "allBlockHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "blockTxHash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610423806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063732a56a41461003b578063845d481e14610061575b600080fd5b61004e61004936600461028e565b610089565b6040519081526020015b60405180910390f35b61007461006f3660046102ed565b610137565b60408051928352602083019190915201610058565b6040516001600160c01b031960c088811b8216602084015260288301889052604883018790526068830186905284811b8216608884015283901b16609082015260009060029060980160408051601f19818403018152908290526100ec9161035f565b602060405180830381855afa158015610109573d6000803e3d6000fd5b5050506040513d601f19601f8201168201806040525081019061012c919061039a565b979650505050505050565b6000806002848460405160200161014f9291906103b3565b60408051601f19818403018152908290526101699161035f565b602060405180830381855afa158015610186573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906101a9919061039a565b91506101b584846101be565b90509250929050565b600061020b6101d16068604885876103c3565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061021292505050565b9392505050565b600081516020146102695760405162461bcd60e51b815260206004820152601760248201527f6279746573206c656e677468206973206e6f742033322e000000000000000000604482015260640160405180910390fd5b506020015190565b803567ffffffffffffffff8116811461028957600080fd5b919050565b60008060008060008060c087890312156102a757600080fd5b6102b087610271565b95506020870135945060408701359350606087013592506102d360808801610271565b91506102e160a08801610271565b90509295509295509295565b6000806020838503121561030057600080fd5b823567ffffffffffffffff8082111561031857600080fd5b818501915085601f83011261032c57600080fd5b81358181111561033b57600080fd5b86602082850101111561034d57600080fd5b60209290920196919550909350505050565b6000825160005b818110156103805760208186018101518583015201610366565b8181111561038f576000828501525b509190910192915050565b6000602082840312156103ac57600080fd5b5051919050565b8183823760009101908152919050565b600080858511156103d357600080fd5b838611156103e057600080fd5b505082019391909203915056fea2646970667358221220d2b32703d3bdff2561264d0016f5ed8ac6414d204568867e742c827967d9353364736f6c634300080a0033";

type BlockTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BlockTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BlockTest__factory extends ContractFactory {
  constructor(...args: BlockTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BlockTest> {
    return super.deploy(overrides || {}) as Promise<BlockTest>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BlockTest {
    return super.attach(address) as BlockTest;
  }
  connect(signer: Signer): BlockTest__factory {
    return super.connect(signer) as BlockTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BlockTestInterface {
    return new utils.Interface(_abi) as BlockTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BlockTest {
    return new Contract(address, _abi, signerOrProvider) as BlockTest;
  }
}
