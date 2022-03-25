/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type CallStruct = { target: string; callData: BytesLike };

export type CallStructOutput = [string, string] & {
  target: string;
  callData: string;
};

export type LpInfoStruct = { lp: string; token0: string; token1: string };

export type LpInfoStructOutput = [string, string, string] & {
  lp: string;
  token0: string;
  token1: string;
};

export type TokenInfoStruct = {
  name: string;
  symbol: string;
  decimals: BigNumberish;
  totalSupply: BigNumberish;
  balance: BigNumberish;
};

export type TokenInfoStructOutput = [
  string,
  string,
  number,
  BigNumber,
  BigNumber
] & {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumber;
  balance: BigNumber;
};

export type PoolInfoStruct = {
  token0: string;
  token1: string;
  reserve0: BigNumberish;
  reserve1: BigNumberish;
};

export type PoolInfoStructOutput = [string, string, BigNumber, BigNumber] & {
  token0: string;
  token1: string;
  reserve0: BigNumber;
  reserve1: BigNumber;
};

export type PoolsInfoStruct = {
  token0: TokenInfoStruct;
  token1: TokenInfoStruct;
  pair: TokenInfoStruct;
  pool: PoolInfoStruct;
};

export type PoolsInfoStructOutput = [
  TokenInfoStructOutput,
  TokenInfoStructOutput,
  TokenInfoStructOutput,
  PoolInfoStructOutput
] & {
  token0: TokenInfoStructOutput;
  token1: TokenInfoStructOutput;
  pair: TokenInfoStructOutput;
  pool: PoolInfoStructOutput;
};

export interface FrontHelperInterface extends utils.Interface {
  functions: {
    "aggregate((address,bytes)[])": FunctionFragment;
    "balances(address,address[])": FunctionFragment;
    "lpTokensInfo(address[])": FunctionFragment;
    "poolInfo(address,address)": FunctionFragment;
    "poolsInfo(address,address[])": FunctionFragment;
    "tokenInfo(address,address)": FunctionFragment;
    "tokensInfo(address,address[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "aggregate",
    values: [CallStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "balances",
    values: [string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "lpTokensInfo",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "poolInfo",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "poolsInfo",
    values: [string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenInfo",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "tokensInfo",
    values: [string, string[]]
  ): string;

  decodeFunctionResult(functionFragment: "aggregate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balances", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lpTokensInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolsInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokensInfo", data: BytesLike): Result;

  events: {};
}

export interface FrontHelper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FrontHelperInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    aggregate(
      calls: CallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "aggregate((address,bytes)[])"(
      calls: CallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balances(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "balances(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    lpTokensInfo(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<[LpInfoStructOutput[]]>;

    "lpTokensInfo(address[])"(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<[LpInfoStructOutput[]]>;

    poolInfo(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<
      [
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        PoolInfoStructOutput
      ] & {
        token0: TokenInfoStructOutput;
        token1: TokenInfoStructOutput;
        pair: TokenInfoStructOutput;
        pool: PoolInfoStructOutput;
      }
    >;

    "poolInfo(address,address)"(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<
      [
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        PoolInfoStructOutput
      ] & {
        token0: TokenInfoStructOutput;
        token1: TokenInfoStructOutput;
        pair: TokenInfoStructOutput;
        pool: PoolInfoStructOutput;
      }
    >;

    poolsInfo(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<[PoolsInfoStructOutput[]]>;

    "poolsInfo(address,address[])"(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<[PoolsInfoStructOutput[]]>;

    tokenInfo(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<[TokenInfoStructOutput]>;

    "tokenInfo(address,address)"(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<[TokenInfoStructOutput]>;

    tokensInfo(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<[TokenInfoStructOutput[]]>;

    "tokensInfo(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<[TokenInfoStructOutput[]]>;
  };

  aggregate(
    calls: CallStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "aggregate((address,bytes)[])"(
    calls: CallStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balances(
    target: string,
    tokens: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "balances(address,address[])"(
    target: string,
    tokens: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  lpTokensInfo(
    _pairs: string[],
    overrides?: CallOverrides
  ): Promise<LpInfoStructOutput[]>;

  "lpTokensInfo(address[])"(
    _pairs: string[],
    overrides?: CallOverrides
  ): Promise<LpInfoStructOutput[]>;

  poolInfo(
    target: string,
    pairAddress: string,
    overrides?: CallOverrides
  ): Promise<
    [
      TokenInfoStructOutput,
      TokenInfoStructOutput,
      TokenInfoStructOutput,
      PoolInfoStructOutput
    ] & {
      token0: TokenInfoStructOutput;
      token1: TokenInfoStructOutput;
      pair: TokenInfoStructOutput;
      pool: PoolInfoStructOutput;
    }
  >;

  "poolInfo(address,address)"(
    target: string,
    pairAddress: string,
    overrides?: CallOverrides
  ): Promise<
    [
      TokenInfoStructOutput,
      TokenInfoStructOutput,
      TokenInfoStructOutput,
      PoolInfoStructOutput
    ] & {
      token0: TokenInfoStructOutput;
      token1: TokenInfoStructOutput;
      pair: TokenInfoStructOutput;
      pool: PoolInfoStructOutput;
    }
  >;

  poolsInfo(
    target: string,
    pairAddress: string[],
    overrides?: CallOverrides
  ): Promise<PoolsInfoStructOutput[]>;

  "poolsInfo(address,address[])"(
    target: string,
    pairAddress: string[],
    overrides?: CallOverrides
  ): Promise<PoolsInfoStructOutput[]>;

  tokenInfo(
    target: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<TokenInfoStructOutput>;

  "tokenInfo(address,address)"(
    target: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<TokenInfoStructOutput>;

  tokensInfo(
    target: string,
    tokens: string[],
    overrides?: CallOverrides
  ): Promise<TokenInfoStructOutput[]>;

  "tokensInfo(address,address[])"(
    target: string,
    tokens: string[],
    overrides?: CallOverrides
  ): Promise<TokenInfoStructOutput[]>;

  callStatic: {
    aggregate(
      calls: CallStruct[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & { blockNumber: BigNumber; returnData: string[] }
    >;

    "aggregate((address,bytes)[])"(
      calls: CallStruct[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string[]] & { blockNumber: BigNumber; returnData: string[] }
    >;

    balances(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "balances(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    lpTokensInfo(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<LpInfoStructOutput[]>;

    "lpTokensInfo(address[])"(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<LpInfoStructOutput[]>;

    poolInfo(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<
      [
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        PoolInfoStructOutput
      ] & {
        token0: TokenInfoStructOutput;
        token1: TokenInfoStructOutput;
        pair: TokenInfoStructOutput;
        pool: PoolInfoStructOutput;
      }
    >;

    "poolInfo(address,address)"(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<
      [
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        TokenInfoStructOutput,
        PoolInfoStructOutput
      ] & {
        token0: TokenInfoStructOutput;
        token1: TokenInfoStructOutput;
        pair: TokenInfoStructOutput;
        pool: PoolInfoStructOutput;
      }
    >;

    poolsInfo(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<PoolsInfoStructOutput[]>;

    "poolsInfo(address,address[])"(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<PoolsInfoStructOutput[]>;

    tokenInfo(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<TokenInfoStructOutput>;

    "tokenInfo(address,address)"(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<TokenInfoStructOutput>;

    tokensInfo(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<TokenInfoStructOutput[]>;

    "tokensInfo(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<TokenInfoStructOutput[]>;
  };

  filters: {};

  estimateGas: {
    aggregate(
      calls: CallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "aggregate((address,bytes)[])"(
      calls: CallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balances(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balances(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lpTokensInfo(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lpTokensInfo(address[])"(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolInfo(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "poolInfo(address,address)"(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolsInfo(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "poolsInfo(address,address[])"(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenInfo(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenInfo(address,address)"(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokensInfo(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokensInfo(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    aggregate(
      calls: CallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "aggregate((address,bytes)[])"(
      calls: CallStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balances(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balances(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lpTokensInfo(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "lpTokensInfo(address[])"(
      _pairs: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolInfo(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "poolInfo(address,address)"(
      target: string,
      pairAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolsInfo(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "poolsInfo(address,address[])"(
      target: string,
      pairAddress: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenInfo(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenInfo(address,address)"(
      target: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokensInfo(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokensInfo(address,address[])"(
      target: string,
      tokens: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
