// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// WARN: Before release should be baned trustListForDex into addNode
contract NodeList {

    struct Node {
        address nodeWallet;
        address nodeIdAddress;
        bytes   blsPubKey;
        uint64 nodeId;
    }

    mapping (address => Node) public listNode;
    /* node => brigde => permission */
    mapping (address => mapping(address => bool)) public trustListForDex;
    Node[] public nodes;

    event AddedNode(address nodeIdAddress);

    modifier isNewNode(address _nodeIdAddr) {
        require(listNode[_nodeIdAddr].nodeWallet == address(0),string(abi.encodePacked("node ", convertToString(_nodeIdAddr), " allready exists")));
        _;
    }

    modifier existingNode(address _nodeIdAddr) {
        require(listNode[_nodeIdAddr].nodeWallet != address(0), string(abi.encodePacked("node ", convertToString(_nodeIdAddr), " does not exist")));
        _;
    }

    //TODO: discuss about check: listNode[_blsPointAddr] == address(0)
    function addNode(address _nodeWallet, address _nodeIdAddress, bytes memory _blsPubKey) external isNewNode(_nodeIdAddress) /*onlyOwner*/ {
        require(_nodeWallet != address(0), "0 address");
        require(_nodeIdAddress != address(0), "0 address");

        Node storage node = listNode[_nodeIdAddress];
        node.nodeId  = getNewNodeId();
        node.nodeWallet   = _nodeWallet;
        node.nodeIdAddress = _nodeIdAddress;
        node.blsPubKey    = _blsPubKey;
        nodes.push(node);

        //TODO: discuss about permission for certain bridge
        trustListForDex[_nodeWallet][address(0)] = true;

        emit AddedNode(node.nodeIdAddress);
    }

    function getNewNodeId() internal view returns (uint64) {
        return uint64(nodes.length);
    }

    function getNode(address _blsPubAddr) external view returns (Node memory) {
        return listNode[_blsPubAddr];
    }

    function getNodes() external view returns (Node[] memory) {
        return nodes;
    }

    function getBLSPubKeys() external view returns (bytes[] memory) {
        bytes[] memory pubKeys = new bytes[](nodes.length);
        for (uint i = 0; i < nodes.length; i++) {
            Node storage node = listNode[nodes[i].nodeIdAddress];
            pubKeys[i] = node.blsPubKey;
        }
        return pubKeys;
    }

    /// @notice Преобразовать адрес в строку для require()
    function convertToString(address account) public pure returns (string memory s) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory data = abi.encodePacked(account);
        bytes memory result = new bytes(2 + data.length * 2);
        result[0] = '0';
        result[1] = 'x';

        for (uint i = 0; i < data.length; i++) {
            result[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
            result[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }

        return string(result);
    }

    function nodeExists(address _nodeIdAddr) public view returns (bool) {
        return listNode[_nodeIdAddr].nodeWallet != address(0);
    }

    function checkPermissionTrustList(address node) external view returns (bool) {
        return trustListForDex[node][address(0)];
    }
}
