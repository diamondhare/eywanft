// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts-newone/access/Ownable.sol";
import "@openzeppelin/contracts-newone/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-newone/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts-newone/token/ERC20/utils/SafeERC20.sol";

interface IPortal {
    struct PermitData {
        uint8 v;
        bytes32 r;
        bytes32 s;
        uint256 deadline;
        bool approveMax;
    }

    struct SynthParams {
        address to;
        address receiveSide;
        address oppositeBridge;
        uint256 chainId;
    }

    function synthesize(
        address token,
        uint256 amount,
        address from,
        SynthParams calldata params
    ) external;

    function synthesizeWithPermit(
        PermitData calldata permitData,
        address token,
        uint256 amount,
        address from,
        address to,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId
    ) external;

    function synthesizeToSolana(
        address token,
        uint256 amount,
        address from,
        bytes32[] calldata pubkeys,
        bytes1 txStateBump,
        uint256 chainId
    ) external;

    function synthesizeBatchWithDataTransit(
        address[] calldata token,
        uint256[] calldata amount, // set a positive amount in order to initiate a synthesize request
        address from,
        SynthParams calldata synthparams,
        bytes4 selector,
        bytes calldata transitData,
        PermitData[] calldata permitData
    ) external;

    function emergencyUnburnRequest(
        bytes32 txID,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function emergencyUnburnRequestToSolana(
        bytes32 txID,
        address from,
        bytes32[] calldata pubkeys,
        uint256 chainId
    ) external;
}

interface ISynthesis {
    struct SynthParams {
        address receiveSide;
        address oppositeBridge;
        uint256 chainId;
    }

    function synthTransfer(
        bytes32 tokenReal,
        uint256 amount,
        address from,
        address to,
        SynthParams calldata params
    ) external;

    function burnSyntheticToken(
        address stoken,
        uint256 amount,
        address from,
        address to,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId
    ) external;

    function burnSyntheticTokenToSolana(
        address stoken,
        address from,
        bytes32[] calldata pubkeys,
        uint256 amount,
        uint256 chainId
    ) external;

    function emergencyUnsyntesizeRequest(
        bytes32 txID,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function emergencyUnsyntesizeRequestToSolana(
        address from,
        bytes32[] calldata pubkeys,
        bytes1 bumpSynthesizeRequest,
        uint256 chainId
    ) external;

    function getRepresentation(bytes32 _rtoken) external view returns (address);
}

interface ICurveProxy {
    struct PermitData {
        uint8 v;
        bytes32 r;
        bytes32 s;
        uint256 deadline;
        bool approveMax;
    }

    struct MetaMintEUSD {
        //crosschain pool params
        address addAtCrosschainPool;
        uint256 expectedMinMintAmountC;
        //incoming coin index for adding liq to hub pool
        uint256 lpIndex;
        //hub pool params
        address addAtHubPool;
        uint256 expectedMinMintAmountH;
        //recipient address
        address to;
        //emergency unsynth params
        address initialBridge;
        uint256 initialChainID;
    }

    struct MetaRedeemEUSD {
        //crosschain pool params
        address removeAtCrosschainPool;
        //outcome index
        int128 x;
        uint256 expectedMinAmountC;
        //hub pool params
        address removeAtHubPool;
        uint256 tokenAmountH;
        //lp index
        int128 y;
        uint256 expectedMinAmountH;
        //recipient address
        address to;
    }

    struct MetaExchangeParams {
        //pool address
        address add;
        address exchange;
        address remove;
        //add liquidity params
        uint256 expectedMinMintAmount;
        //exchange params
        int128 i; //index value for the coin to send
        int128 j; //index value of the coin to receive
        uint256 expectedMinDy;
        //withdraw one coin params
        int128 x; //index value of the coin to withdraw
        uint256 expectedMinAmount;
        //transfer to
        address to;
        //unsynth params
        address chain2address;
        address receiveSide;
        address oppositeBridge;
        uint256 chainId;
        //emergency unsynth params
        address initialBridge;
        uint256 initialChainID;
    }

    function addLiquidity3PoolMintEUSD(
        MetaMintEUSD calldata params,
        PermitData[] calldata permit,
        address[3] calldata token,
        uint256[3] calldata amount
    ) external;

    function metaExchange(
        MetaExchangeParams calldata params,
        PermitData[] calldata permit,
        address[3] calldata token,
        uint256[3] calldata amount
    ) external;

    function redeemEUSD(
        MetaRedeemEUSD calldata params,
        PermitData calldata permit,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId
    ) external;
}

interface IERC20Permit {
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}

contract Router is Ownable {
    address _localTreasury;
    address _curveProxy;
    address _portal;
    address _synthesis;

    mapping(address => bool) public _trustedWorker;

    event CrosschainPaymentEvent(
        address indexed userFrom,
        address payToken,
        uint256 executionPrice,
        address indexed worker
    );

    struct DelegatedCallReceipt {
        uint256 executionPrice;
        uint256 deadline;
        uint8[2] v;
        bytes32[2] r;
        bytes32[2] s;
    }

    constructor(
        address portal,
        address synthesis,
        address curveProxy,
        address localTreasury
    ) {
        _portal = portal;
        _synthesis = synthesis;
        _curveProxy = curveProxy;
        _localTreasury = localTreasury;
    }

    function setTrustedWorker(address worker) public onlyOwner {
        _trustedWorker[worker] = true;
    }

    function removeTrustedWorker(address worker) public onlyOwner {
        _trustedWorker[worker] = false;
    }

    //TODO: add useNonce
    function _checkSignatures(
        address payToken,
        address from,
        DelegatedCallReceipt calldata receipt
    ) internal view {
        bytes32 workerStructHash = keccak256(
            abi.encodePacked(
                //TYPEHASH
                //useNonce(from)
                block.chainid,
                payToken,
                receipt.executionPrice,
                from,
                msg.sender, /* worker */
                receipt.deadline
            )
        );
        bytes32 senderStructHash = keccak256(
            abi.encodePacked(
                //TYPEHASH
                receipt.v[0],
                receipt.r[0],
                receipt.s[0]
            )
        );

        address worker = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(workerStructHash),
            receipt.v[0],
            receipt.r[0],
            receipt.s[0]
        );
        address sender = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(senderStructHash),
            receipt.v[1],
            receipt.r[1],
            receipt.s[1]
        );

        require(_trustedWorker[worker], "Router: invalid signature from worker");
        require(sender == from, "Router: invalid signature from sender");
        require(block.timestamp <= receipt.deadline, "Router: deadline");
    }

    function _proceedFees(
        address payToken,
        address from,
        DelegatedCallReceipt calldata receipt
    ) internal {
        _checkSignatures(payToken, from, receipt);
        // worker fee
        SafeERC20.safeTransferFrom(IERC20(payToken), from, msg.sender, receipt.executionPrice);

        emit CrosschainPaymentEvent(from, payToken, receipt.executionPrice, msg.sender);
    }

    function _proceedFeesWithTransfer(
        address payToken,
        uint256 generalAmount,
        address from,
        address to,
        DelegatedCallReceipt calldata receipt
    ) internal returns (uint256 proceedAmount) {
        _checkSignatures(payToken, from, receipt);
        // worker fee
        SafeERC20.safeTransferFrom(IERC20(payToken), from, msg.sender, receipt.executionPrice);
        // proceed remaining amount
        proceedAmount = generalAmount - receipt.executionPrice;
        SafeERC20.safeTransferFrom(IERC20(payToken), from, to, proceedAmount);

        emit CrosschainPaymentEvent(from, payToken, receipt.executionPrice, msg.sender);
    }

    function _proceedFeesWithApprove(
        address payToken,
        uint256 generalAmount,
        address from,
        address to,
        DelegatedCallReceipt calldata receipt
    ) internal returns (uint256 proceedAmount) {
        _checkSignatures(payToken, from, receipt);
        // worker fee
        SafeERC20.safeTransferFrom(IERC20(payToken), from, msg.sender, receipt.executionPrice);
        // approve remaining amount
        proceedAmount = generalAmount - receipt.executionPrice;
        IERC20(payToken).approve(to, proceedAmount);

        emit CrosschainPaymentEvent(from, payToken, receipt.executionPrice, msg.sender);
    }

    //==============================PORTAL==============================
    /* *
     * @dev Delegated token synthesize request.
     * @param token token address to synthesize
     * @param amount amount to synthesize
     * @param from msg sender address
     * @param to amount recipient address
     * @param receiveSide request recipient address
     * @param oppositeBridge opposite bridge address
     * @param chainId opposite chain ID
     * @param receipt delegated call receipt
     */

    function delegatedTokenSynthesizeRequest(
        address token,
        uint256 amount,
        address from,
        IPortal.SynthParams calldata synthParams,
        DelegatedCallReceipt calldata receipt
    ) external {
        uint256 proceedAmount = _proceedFeesWithTransfer(token, amount, from, _portal, receipt);
        IPortal(_portal).synthesize(token, proceedAmount, from, synthParams);
    }

    /* *
     * @dev Delegated token synthesize request with permit.
     * @param token token address to synthesize
     * @param amount amount to synthesize
     * @param to amount recipient address
     * @param receiveSide request recipient address
     * @param oppositeBridge opposite bridge address
     * @param chainId opposite chain ID
     * @param permitData permit data
     * @param receipt delegated call receipt
     */
    function delegatedTokenSynthesizeRequestWithPermit(
        address token,
        uint256 amount,
        address from,
        IPortal.SynthParams calldata synthParams,
        IPortal.PermitData calldata permitData,
        DelegatedCallReceipt calldata receipt
    ) external {
        IERC20Permit(token).permit(
            from,
            address(this),
            permitData.approveMax ? uint256(2**256 - 1) : amount,
            permitData.deadline,
            permitData.v,
            permitData.r,
            permitData.s
        );
        uint256 proceedAmount = _proceedFeesWithTransfer(token, amount, from, _portal, receipt);
        IPortal(_portal).synthesize(token, proceedAmount, from, synthParams);
    }

    /* *
     * @dev  Delegated token synthesize request with bytes32 support for Solana.
     * @param token token address to synthesize
     * @param amount amount to synthesize
     * @param pubkeys synth data for Solana
     * @param txStateBump transaction state bump
     * @param chainId opposite chain ID
     * @param receipt delegated call receipt
     */
    function delegatedTokenSynthesizeRequestToSolana(
        address token,
        uint256 amount,
        address from,
        bytes32[] calldata pubkeys,
        bytes1 txStateBump,
        uint256 chainId,
        DelegatedCallReceipt calldata receipt
    ) external {
        uint256 proceedAmount = _proceedFeesWithTransfer(token, amount, from, _portal, receipt);
        IPortal(_portal).synthesizeToSolana(token, proceedAmount, from, pubkeys, txStateBump, chainId);
    }

    /* *
     * @dev  Delegated batch synthesize request with data transition.
     */
    function delegatedBatchSynthesizeRequestWithDataTransit(
        address[] calldata token,
        uint256[] calldata amount, // set a positive amount in order to initiate a synthesize request
        address from,
        bytes4 selector,
        bytes calldata transitData,
        IPortal.SynthParams calldata synthParams,
        IPortal.PermitData[] calldata permitData,
        DelegatedCallReceipt calldata receipt
    ) external {
        uint256[] memory proceedAmount = new uint256[](amount.length);
        for (uint256 i = 0; i < token.length; i++) {
            if (amount[i] > 0) {
                if (permitData[i].v != 0) {
                    uint256 approve_value = permitData[i].approveMax ? uint256(2**256 - 1) : amount[i];
                    IERC20Permit(token[i]).permit(
                        from,
                        address(this),
                        approve_value,
                        permitData[i].deadline,
                        permitData[i].v,
                        permitData[i].r,
                        permitData[i].s
                    );
                }
                proceedAmount[i] = _proceedFeesWithTransfer(token[i], amount[i], from, _portal, receipt);
                //break;
            }
        }
        IPortal(_portal).synthesizeBatchWithDataTransit(
            token,
            proceedAmount,
            from,
            synthParams,
            selector,
            transitData,
            permitData
        );
    }

    //TODO:emergency? (add OG token to check with sig)
    // // TODO check payToken
    // function delegatedEmergencyUnburnRequest(
    //     bytes32 txID,
    //     address from,
    //     address payToken,
    //     address receiveSide,
    //     address oppositeBridge,
    //     uint256 chainId,
    //     DelegatedCallReceipt calldata receipt
    // ) external {
    //     // TODO check sig from orig sender
    //     _proceedFees(payToken, from, receipt);
    //     IPortal(_portal).emergencyUnburnRequest(txID, from, receiveSide, oppositeBridge, chainId);
    // }

    // // TODO check payToken
    // function delegatedEmergencyUnburnRequestToSolana(
    //     bytes32 txID,
    //     address from,
    //     address payToken,
    //     bytes32[] calldata pubkeys,
    //     uint256 chainId,
    //     DelegatedCallReceipt calldata receipt
    // ) external {
    //     // TODO check sig from orig sender
    //     _proceedFees(payToken, from, receipt);
    //     IPortal(_portal).emergencyUnburnRequestToSolana(txID, from, pubkeys, chainId);
    // }

    //==============================SYNTHESIS==============================
    function delegatedSynthTransferRequest(
        bytes32 tokenReal,
        address tokenSynth,
        uint256 amount,
        address from,
        address to,
        ISynthesis.SynthParams calldata synthParams,
        DelegatedCallReceipt calldata receipt
    ) external {
        uint256 proceedAmount = _proceedFeesWithApprove(tokenSynth, amount, from, _synthesis, receipt);
        ISynthesis(_synthesis).synthTransfer(tokenReal, proceedAmount, from, to, synthParams);
    }

    function delegatedUnsynthesizeRequest(
        address stoken,
        uint256 amount,
        address from,
        address to,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId,
        DelegatedCallReceipt calldata receipt
    ) external {
        uint256 proceedAmount = _proceedFeesWithApprove(stoken, amount, from, _synthesis, receipt);
        ISynthesis(_synthesis).burnSyntheticToken(
            stoken,
            proceedAmount,
            from,
            to,
            receiveSide,
            oppositeBridge,
            chainId
        );
    }

    function delegatedUnsynthesizeRequestToSolana(
        address stoken,
        address from,
        bytes32[] calldata pubkeys,
        uint256 amount,
        uint256 chainId,
        DelegatedCallReceipt calldata receipt
    ) external {
        uint256 proceedAmount = _proceedFeesWithApprove(stoken, amount, from, _synthesis, receipt);
        ISynthesis(_synthesis).burnSyntheticTokenToSolana(stoken, from, pubkeys, proceedAmount, chainId);
    }

    //TODO:emergency?
    // function delegatedEmergencyUnsyntesizeRequest(
    //     bytes32 txID,
    //     address from,
    //     address payToken,
    //     address receiveSide,
    //     address oppositeBridge,
    //     uint256 chainId,
    //     DelegatedCallReceipt calldata receipt
    // ) external {
    //     // TODO check sig from orig sender
    //     // TODO check payToken
    //     _proceedFees(payToken, from, receipt);
    //     ISynthesis(_synthesis).emergencyUnsyntesizeRequest(txID, from, receiveSide, oppositeBridge, chainId);
    // }

    // function delegatedEmergencyUnsyntesizeRequestToSolana(
    //     address from,
    //     address payToken,
    //     bytes32[] calldata pubkeys,
    //     bytes1 bumpSynthesizeRequest,
    //     uint256 chainId,
    //     DelegatedCallReceipt calldata receipt
    // ) external {
    //     // TODO check sig from orig sender
    //     // TODO check payToken
    //     _proceedFees(payToken, from, receipt);
    //     ISynthesis(_synthesis).emergencyUnsyntesizeRequestToSolana(from, pubkeys, bumpSynthesizeRequest, chainId);
    // }

    //==============================CURVE-PROXY==============================
    /* *
     * @dev Delegated local mint EUSD request (hub chain execution only)
     * @param params MetaMintEUSD params
     * @param permit permit operation params
     * @param token token addresses
     * @param amount amounts to transfer
     * @param receipt delegated call receipt
     */
    function delegatedMintEusdRequestVia3pool(
        ICurveProxy.MetaMintEUSD memory params,
        ICurveProxy.PermitData[] calldata permit,
        address from,
        address[3] calldata token,
        uint256[3] memory amount,
        DelegatedCallReceipt calldata receipt
    ) external {
        for (uint256 i = 0; i < token.length; i++) {
            if (amount[i] > 0) {
                amount[i] = _proceedFeesWithTransfer(token[i], amount[i], from, _curveProxy, receipt);
                //break;
            }
        }
        ICurveProxy(_curveProxy).addLiquidity3PoolMintEUSD(params, permit, token, amount);
    }

    /* *
     * @dev Delegated local meta exchange request (hub chain execution only)
     * @param params meta exchange params
     * @param permit permit operation params
     * @param token token addresses to transfer within initial stage
     * @param amount amounts to transfer within initial stage
     * @param receipt delegated call receipt
     */
    function delegatedMetaExchangeRequestVia3pool(
        ICurveProxy.MetaExchangeParams calldata params,
        ICurveProxy.PermitData[] calldata permit,
        address from,
        address[3] calldata token,
        uint256[3] memory amount,
        DelegatedCallReceipt calldata receipt
    ) external {
        for (uint256 i = 0; i < token.length; i++) {
            if (amount[i] > 0) {
                amount[i] = _proceedFeesWithTransfer(token[i], amount[i], from, _curveProxy, receipt);
            }
        }
        ICurveProxy(_curveProxy).metaExchange(params, permit, token, amount);
    }

    /* *
     * @dev Delegated local EUSD redeem request with unsynth operation (hub chain execution only)
     * @param params meta redeem EUSD params
     * @param permit permit params
     * @param receiveSide calldata recipient address for unsynth operation
     * @param oppositeBridge opposite bridge contract address
     * @param chainId opposite chain ID
     * @param receipt delegated call receipt
     */
    function delegatedRedeemEusdRequest(
        ICurveProxy.MetaRedeemEUSD memory params,
        ICurveProxy.PermitData calldata permit,
        address payToken,
        address from,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId,
        DelegatedCallReceipt calldata receipt
    ) external {
        uint256 proceedAmount = _proceedFeesWithTransfer(payToken, params.tokenAmountH, from, _curveProxy, receipt);
        params.tokenAmountH = proceedAmount;
        ICurveProxy(_curveProxy).redeemEUSD(params, permit, receiveSide, oppositeBridge, chainId);
    }

    //.........................DIRECT-METHODS...........................
    //==============================PORTAL==============================
    /* *
     * @dev Delegated token synthesize request.
     * @param token token address to synthesize
     * @param amount amount to synthesize
     * @param from msg sender address
     * @param to amount recipient address
     * @param receiveSide request recipient address
     * @param oppositeBridge opposite bridge address
     * @param chainId opposite chain ID
     */

    function tokenSynthesizeRequest(
        address token,
        uint256 amount,
        address from,
        IPortal.SynthParams calldata synthParams
    ) external {
        SafeERC20.safeTransferFrom(IERC20(token), from, _portal, amount);
        IPortal(_portal).synthesize(token, amount, from, synthParams);
    }

    /* *
     * @dev Delegated token synthesize request with permit.
     * @param token token address to synthesize
     * @param amount amount to synthesize
     * @param to amount recipient address
     * @param receiveSide request recipient address
     * @param oppositeBridge opposite bridge address
     * @param chainId opposite chain ID
     * @param permitData permit data
     */
    function tokenSynthesizeRequestWithPermit(
        address token,
        uint256 amount,
        address from,
        IPortal.SynthParams calldata synthParams,
        IPortal.PermitData calldata permitData
    ) external {
        IERC20Permit(token).permit(
            from,
            address(this),
            permitData.approveMax ? uint256(2**256 - 1) : amount,
            permitData.deadline,
            permitData.v,
            permitData.r,
            permitData.s
        );
        SafeERC20.safeTransferFrom(IERC20(token), from, _portal, amount);
        IPortal(_portal).synthesize(token, amount, from, synthParams);
    }

    /* *
     * @dev  Delegated token synthesize request with bytes32 support for Solana.
     * @param token token address to synthesize
     * @param amount amount to synthesize
     * @param pubkeys synth data for Solana
     * @param txStateBump transaction state bump
     * @param chainId opposite chain ID
     */
    function tokenSynthesizeRequestToSolana(
        address token,
        uint256 amount,
        address from,
        bytes32[] calldata pubkeys,
        bytes1 txStateBump,
        uint256 chainId
    ) external {
        SafeERC20.safeTransferFrom(IERC20(token), from, _portal, amount);
        IPortal(_portal).synthesizeToSolana(token, amount, from, pubkeys, txStateBump, chainId);
    }

    /* *
     * @dev  Delegated batch synthesize request with data transition.
     */
    function batchSynthesizeRequestWithDataTransit(
        address[] calldata token,
        uint256[] calldata amount, // set a positive amount in order to initiate a synthesize request
        address from,
        bytes4 selector,
        bytes calldata transitData,
        IPortal.SynthParams calldata synthParams,
        IPortal.PermitData[] calldata permitData
    ) external {
        for (uint256 i = 0; i < token.length; i++) {
            if (amount[i] > 0) {
                SafeERC20.safeTransferFrom(IERC20(token[i]), from, _portal, amount[i]);
            }
        }
        IPortal(_portal).synthesizeBatchWithDataTransit(token, amount, from, synthParams, selector, transitData, permitData);
    }

    //TODO:emergency?
    function emergencyUnburnRequest(
        bytes32 txID,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        IPortal(_portal).emergencyUnburnRequest(txID, receiveSide, oppositeBridge, chainId, v, r, s);
    }

    // function emergencyUnburnRequestToSolana(
    //     bytes32 txID,
    //     bytes32[] calldata pubkeys,
    //     uint256 chainId
    // ) external {
    //     IPortal(_portal).emergencyUnburnRequestToSolana(txID, pubkeys, chainId);
    // }

    //==============================CURVE-PROXY==============================
    /* *
     * @dev Delegated local mint EUSD request (hub chain execution only)
     * @param params MetaMintEUSD params
     * @param permit permit operation params
     * @param token token addresses
     * @param amount amounts to transfer
     */
    function mintEusdRequestVia3pool(
        ICurveProxy.MetaMintEUSD calldata params,
        ICurveProxy.PermitData[] calldata permit,
        address from,
        address[3] calldata token,
        uint256[3] calldata amount
    ) external {
        for (uint256 i = 0; i < token.length; i++) {
            if (amount[i] > 0) {
                SafeERC20.safeTransferFrom(IERC20(token[i]), from, _portal, amount[i]);
            }
        }
        ICurveProxy(_curveProxy).addLiquidity3PoolMintEUSD(params, permit, token, amount);
    }

    /* *
     * @dev Delegated local meta exchange request (hub chain execution only)
     * @param params meta exchange params
     * @param permit permit operation params
     * @param token token addresses to transfer within initial stage
     * @param amount amounts to transfer within initial stage
     */
    function metaExchangeRequestVia3pool(
        ICurveProxy.MetaExchangeParams calldata params,
        ICurveProxy.PermitData[] calldata permit,
        address from,
        address[3] calldata token,
        uint256[3] calldata amount
    ) external {
        for (uint256 i = 0; i < token.length; i++) {
            if (amount[i] > 0) {
                SafeERC20.safeTransferFrom(IERC20(token[i]), from, _portal, amount[i]);
            }
        }
        ICurveProxy(_curveProxy).metaExchange(params, permit, token, amount);
    }

    /* *
     * @dev Delegated local EUSD redeem request with unsynth operation (hub chain execution only)
     * @param params meta redeem EUSD params
     * @param permit permit params
     * @param receiveSide calldata recipient address for unsynth operation
     * @param oppositeBridge opposite bridge contract address
     * @param chainId opposite chain ID
     */
    function redeemEusdRequest(
        ICurveProxy.MetaRedeemEUSD calldata params,
        ICurveProxy.PermitData calldata permit,
        address payToken,
        address from,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId
    ) external {
        SafeERC20.safeTransferFrom(IERC20(payToken), from, _curveProxy, params.tokenAmountH);
        ICurveProxy(_curveProxy).redeemEUSD(params, permit, receiveSide, oppositeBridge, chainId);
    }

    //==============================SYNTHESIS==============================
    function synthTransferRequest(
        bytes32 tokenReal,
        uint256 amount,
        address from,
        address to,
        ISynthesis.SynthParams calldata synthParams
    ) external {
        address tokenSynth = ISynthesis(_synthesis).getRepresentation(tokenReal);
        SafeERC20.safeTransferFrom(IERC20(tokenSynth), from, address(this), amount);
        IERC20(tokenSynth).approve(_synthesis, amount);
        ISynthesis(_synthesis).synthTransfer(tokenReal, amount, from, to, synthParams);
    }

    function unsynthesizeRequest(
        address stoken,
        uint256 amount,
        address from,
        address to,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId
    ) external {
        SafeERC20.safeTransferFrom(IERC20(stoken), from, address(this), amount);
        IERC20(stoken).approve(_synthesis, amount);
        ISynthesis(_synthesis).burnSyntheticToken(stoken, amount, from, to, receiveSide, oppositeBridge, chainId);
    }

    function unsynthesizeRequestToSolana(
        address stoken,
        address from,
        bytes32[] calldata pubkeys,
        uint256 amount,
        uint256 chainId
    ) external {
        SafeERC20.safeTransferFrom(IERC20(stoken), from, address(this), amount);
        IERC20(stoken).approve(_synthesis, amount);
        ISynthesis(_synthesis).burnSyntheticTokenToSolana(stoken, from, pubkeys, amount, chainId);
    }

    function emergencyUnsyntesizeRequest(
        bytes32 txID,
        address receiveSide,
        address oppositeBridge,
        uint256 chainId,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        ISynthesis(_synthesis).emergencyUnsyntesizeRequest(txID, receiveSide, oppositeBridge, chainId, v, r, s);
    }

    // function emergencyUnsyntesizeRequestToSolana(
    //     address from,
    //     bytes32[] calldata pubkeys,
    //     bytes1 bumpSynthesizeRequest,
    //     uint256 chainId
    // ) external {
    //     ISynthesis(_synthesis).emergencyUnsyntesizeRequestToSolana(from, pubkeys, bumpSynthesizeRequest, chainId);
    // }
}