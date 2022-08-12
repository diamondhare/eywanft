// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts-newone/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts-newone/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts-newone/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts-newone/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-newone/access/Ownable.sol";
import "@openzeppelin/contracts-newone/utils/Strings.sol";
import "@openzeppelin/contracts-newone/utils/cryptography/MerkleProof.sol";
import "./Vesting.sol";


contract EywaNFT is ERC721Enumerable, Ownable, ERC721Burnable {
    using SafeERC20 for IERC20;
    using Strings for uint256;

    address TREASURY = address(0);

    uint256 public immutable CLIFF_PERCENT = 10;

    uint256 private TIER_ONE_START = 1;
    uint256 private TIER_ONE_SUPPLY = 25077;
    uint256 private TIER_ONE_MIN_SCORE = 110;
    uint256 private TIER_ONE_MAX_SCORE = 2000;
    uint256[25077] private tierOneArray;
    uint256 private tierOneIndex;

    uint256 private TIER_TWO_START = 25078;
    uint256 private TIER_TWO_SUPPLY = 23862;
    uint256 private TIER_TWO_MAX_SCORE = 3000;
    uint256[23862] private tierTwoArray;
    uint256 private tierTwoIndex;

    uint256 private TIER_THREE_START = 48940;
    uint256 private TIER_THREE_SUPPLY = 3676;
    uint256 private TIER_THREE_MAX_SCORE = 5000;
    uint256[3676] private tierThreeArray;
    uint256 private tierThreeIndex;

    uint256 private TIER_FOUR_START = 52616;
    uint256 private TIER_FOUR_SUPPLY = 401;
    uint256 private TIER_FOUR_MAX_SCORE = 100000;
    uint256[401] private tierFourArray;
    uint256 private tierFourIndex;

    uint256 private TEAM_LEGENDARY_START = 55000;
    uint256 private TEAM_RARE_START = 55400;
    uint256 private TEAM_UNCOMMON_START = 55700;
    uint256 private TEAM_COMMON_START = 55900;

    uint256 private teamLegendaryIndex = 0;
    uint256 private teamRareIndex = 0;
    uint256 private teamUncommonIndex = 0;
    uint256 private teamCommonIndex = 0;

    uint256 private teamLegendaryAllocation = 500 ether;
    uint256 private teamRareAllocation = 250 ether;
    uint256 private teamUncommonAllocation = 200 ether;
    uint256 private teamCommonAllocation = 150 ether;

    uint256 private idIncrement = 100000;

    bool public claimingActive;
    bool public vestingActive;
    bool public saleActive;

    uint256 private allocation;
    uint256 private totalScore;
    bytes32 private merkleRoot;
    string private baseURI;

    mapping(uint256 => uint8) public tokenStatus;
    mapping(address => uint256) public mintedBy;
    mapping(uint256 => uint256) public claimableAmount;

    EywaVesting public vestingContract;
    IERC20 public EYWA_TOKEN;

    event UnclaimedMint(address indexed to, uint256 indexed tokenId, uint256 score);
    event Mint(address indexed to, uint256 indexed tokenId, uint256 score);


    constructor(
        string memory name,
        string memory symbol,
        uint256 _allocation,
        uint256 _totalScore
    ) ERC721(name, symbol) {
        allocation = _allocation;
        totalScore = _totalScore;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setAllocation(uint256 _alloc) external onlyOwner {
        allocation = _alloc;
    }

    function startClaiming() external onlyOwner {
        claimingActive = true;
    }

    function stopClaiming() external onlyOwner {
        claimingActive = false;
    }

    function startVesting() external onlyOwner {
        vestingActive = true;
    }

    function stopVesting() external onlyOwner {
        vestingActive = false;
    }

    function setTotalScore(uint256 _totScore) external onlyOwner {
        totalScore = _totScore;
    }

    function setBaseURI(string memory _uri) external onlyOwner {
        baseURI = _uri;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function setVestingAddress(EywaVesting _vestingContract) external onlyOwner {
        vestingContract = _vestingContract;
    }

    function setEywaTokenAddress(IERC20 _eywaToken) external onlyOwner {
        EYWA_TOKEN = _eywaToken;
    }

    function setSaleOpen() external onlyOwner {
        saleActive = true;
    }

    function setSaleClosed() external onlyOwner {
        saleActive = false;
    }

    function setTreasury(address _treasury) external onlyOwner {
        TREASURY = _treasury;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : '';
    }

    function getTokenStatus(uint256 _tokenId) external view returns (uint8) {
        return tokenStatus[_tokenId];
    }

    function getClaimableAmount(uint256 _tokenId) external view returns (uint256) {
        return claimableAmount[_tokenId];
    }

    function setTeamLegendaryAllocation(uint256 _alloc) external onlyOwner {
        teamLegendaryAllocation = _alloc;
    }

    function setTeamRareAllocation(uint256 _alloc) external onlyOwner {
        teamRareAllocation = _alloc;
    }

    function setTeamUncommonAllocation(uint256 _alloc) external onlyOwner {
        teamUncommonAllocation = _alloc;
    }

    function setTeamCommonAllocation(uint256 _alloc) external onlyOwner {
        teamCommonAllocation = _alloc;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        Address.sendValue(payable(owner()), balance);
    }

    function mint(bytes32[] calldata _merkleProof, uint256 score) external {
        require(saleActive, "Sale is closed");
        require(merkleRoot != 0, "Merkle root not set");
        require(getMintedNum(msg.sender) < 1, "Can be minted only once");

        require(
            MerkleProof.verify(
                _merkleProof,
                merkleRoot,
                keccak256(abi.encodePacked(msg.sender, score)
                )
            ), "Invalid proof");

        uint256 _tokenId;

        if (TIER_ONE_MIN_SCORE <= score && score <= TIER_ONE_MAX_SCORE) {
            require(tierOneIndex + 1 <= TIER_ONE_SUPPLY, "Tier 1 supply ended");
            _tokenId = _pickRandomUniqueIdTierOne() + TIER_ONE_START;
        } else if (TIER_ONE_MAX_SCORE < score && score <= TIER_TWO_MAX_SCORE) {
            require(tierTwoIndex + 1 <= TIER_TWO_SUPPLY, "Tier 2 supply ended");
            _tokenId = _pickRandomUniqueIdTierTwo() + TIER_TWO_START;
        } else if (TIER_TWO_MAX_SCORE < score && score <= TIER_THREE_MAX_SCORE) {
            require(tierThreeIndex + 1 <= TIER_THREE_SUPPLY, "Tier 3 supply ended");
            _tokenId = _pickRandomUniqueIdTierThree() + TIER_THREE_START;
        } else if (TIER_THREE_MAX_SCORE < score && score <= TIER_FOUR_MAX_SCORE) {
            require(tierFourIndex + 1 <= TIER_FOUR_SUPPLY, "Tier 4 supply ended");
            _tokenId = _pickRandomUniqueIdTierFour() + TIER_FOUR_START;
        } else {
            revert("Score out of bounds");
        }

        claimableAmount[_tokenId] = allocation * score / totalScore;

        _safeMint(msg.sender, _tokenId);
        tokenStatus[_tokenId] = 1;
        mintedBy[msg.sender] += 1;
        emit Mint(msg.sender, _tokenId, score);
    }

    function mintUnclaimed(address _tokenOwner, uint256 score) onlyOwner external {
        uint256 _tokenId;

        if (TIER_ONE_MIN_SCORE <= score && score <= TIER_ONE_MAX_SCORE) {
            require(tierOneIndex + 1 <= TIER_ONE_SUPPLY, "Tier 1 supply ended");
            _tokenId = _pickRandomUniqueIdTierOne() + TIER_ONE_START;
        } else if (TIER_ONE_MAX_SCORE < score && score <= TIER_TWO_MAX_SCORE) {
            require(tierTwoIndex + 1 <= TIER_TWO_SUPPLY, "Tier 2 supply ended");
            _tokenId = _pickRandomUniqueIdTierTwo() + TIER_TWO_START;
        } else if (TIER_TWO_MAX_SCORE < score && score <= TIER_THREE_MAX_SCORE) {
            require(tierThreeIndex + 1 <= TIER_THREE_SUPPLY, "Tier 3 supply ended");
            _tokenId = _pickRandomUniqueIdTierThree() + TIER_THREE_START;
        } else if (TIER_THREE_MAX_SCORE < score && score <= TIER_FOUR_MAX_SCORE) {
            require(tierFourIndex + 1 <= TIER_FOUR_SUPPLY, "Tier 4 supply ended");
            _tokenId = _pickRandomUniqueIdTierFour() + TIER_FOUR_START;
        } else {
            revert("Score out of bounds");
        }

        claimableAmount[_tokenId] = allocation * score / totalScore;

        _safeMint(TREASURY, _tokenId);
        tokenStatus[_tokenId] = 1;
        mintedBy[_tokenOwner] += 1;
        emit UnclaimedMint(_tokenOwner, _tokenId, score);
    }

    function claimCliff(uint256 tokenId) external {
        require(claimingActive, "Claiming period not started");
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        require(claimableAmount[tokenId] != 0, "Must have claimable amount");
        require(tokenStatus[tokenId] == 1, "Token must have unclaimed cliff");


        if (isTeamNft(tokenId)) {
            require(address(EYWA_TOKEN) != address(0), "Eywa token address not set");
            require(EYWA_TOKEN.balanceOf(address(this)) >= claimableAmount[tokenId], "Not enough tokens");

            EYWA_TOKEN.transfer(msg.sender, claimableAmount[tokenId]);
            burn(tokenId);

            uint256 newToken = tokenId + idIncrement * 2;
            _safeMint(msg.sender, newToken);
            tokenStatus[newToken] = 3;
            claimableAmount[newToken] = 0;

        } else {
            uint256 claimedCliff = claimableAmount[tokenId] * CLIFF_PERCENT / 100;
            uint256 remainingAmount = claimableAmount[tokenId] - claimedCliff;
            vestingContract.claim(claimedCliff);
            vestingContract.eywaToken().safeTransfer(msg.sender, claimedCliff);
            burn(tokenId);

            uint256 newToken = tokenId + idIncrement;
            _safeMint(msg.sender, newToken);
            tokenStatus[newToken] = 2;
            claimableAmount[newToken] = remainingAmount;
        }

        delete tokenStatus[tokenId];
        delete claimableAmount[tokenId];
    }

    function activateVesting(uint256 tokenId) external {
        require(vestingActive, "Vesting period not started");
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        require(claimableAmount[tokenId] != 0, "Must have claimable amount");
        require(tokenStatus[tokenId] == 2, "Token must have unclaimed cliff");

        vestingContract.transfer(msg.sender, claimableAmount[tokenId]);
        burn(tokenId);

        uint256 newToken = tokenId + idIncrement;

        _safeMint(msg.sender, newToken);
        tokenStatus[newToken] = 3;

        delete tokenStatus[tokenId];
        delete claimableAmount[tokenId];
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view override(ERC721Enumerable) returns (uint256) {
        return super.tokenOfOwnerByIndex(owner, index);
    }

    function _pickRandomUniqueIdTierOne() private returns (uint256 id) {
        uint256 random = genRandom();
        uint256 len = tierOneArray.length - tierOneIndex++;
        require(len > 0, 'no ids left');
        uint256 randomIndex = random % len;
        id = tierOneArray[randomIndex] != 0 ? tierOneArray[randomIndex] : randomIndex;
        tierOneArray[randomIndex] = uint16(tierOneArray[len - 1] == 0 ? len - 1 : tierOneArray[len - 1]);
        tierOneArray[len - 1] = 0;
    }

    function _pickRandomUniqueIdTierTwo() private returns (uint256 id) {
        uint256 random = genRandom();
        uint256 len = tierTwoArray.length - tierTwoIndex++;
        require(len > 0, 'no ids left');
        uint256 randomIndex = random % len;
        id = tierTwoArray[randomIndex] != 0 ? tierTwoArray[randomIndex] : randomIndex;
        tierTwoArray[randomIndex] = uint16(tierTwoArray[len - 1] == 0 ? len - 1 : tierTwoArray[len - 1]);
        tierTwoArray[len - 1] = 0;
    }

    function _pickRandomUniqueIdTierThree() private returns (uint256 id) {
        uint256 random = genRandom();
        uint256 len = tierThreeArray.length - tierThreeIndex++;
        require(len > 0, 'no ids left');
        uint256 randomIndex = random % len;
        id = tierThreeArray[randomIndex] != 0 ? tierThreeArray[randomIndex] : randomIndex;
        tierThreeArray[randomIndex] = uint16(tierThreeArray[len - 1] == 0 ? len - 1 : tierThreeArray[len - 1]);
        tierThreeArray[len - 1] = 0;
    }

    function _pickRandomUniqueIdTierFour() private returns (uint256 id) {
        uint256 random = genRandom();
        uint256 len = tierFourArray.length - tierFourIndex++;
        require(len > 0, 'no ids left');
        uint256 randomIndex = random % len;
        id = tierFourArray[randomIndex] != 0 ? tierFourArray[randomIndex] : randomIndex;
        tierFourArray[randomIndex] = uint16(tierFourArray[len - 1] == 0 ? len - 1 : tierFourArray[len - 1]);
        tierFourArray[len - 1] = 0;
    }

    function getMintedNum(address owner) private view returns (uint256) {
        return mintedBy[owner];
    }

    function genRandom() public view returns (uint256) {
        return uint256(blockhash(block.number - 1));
    }

    function claimTeamLegendary(uint num) external onlyOwner {
        require(teamLegendaryIndex < 400, "No legendary nfts left");
        uint256 start = TEAM_LEGENDARY_START + teamLegendaryIndex;
        uint256 end = start + num;
        for (uint256 _tokenId = start; _tokenId < end; _tokenId++) {
            claimableAmount[_tokenId] = teamLegendaryAllocation;
            _safeMint(msg.sender, _tokenId);
            tokenStatus[_tokenId] = 1;
        }
        teamLegendaryIndex += num;
    }

    function claimTeamRare(uint num) external onlyOwner {
        require(teamRareIndex < 300, "No rare nfts left");
        uint256 start = TEAM_RARE_START + teamRareIndex;
        uint256 end = start + num;
        for (uint256 _tokenId = start; _tokenId < end; _tokenId++) {
            claimableAmount[_tokenId] = teamRareAllocation;
            _safeMint(msg.sender, _tokenId);
            tokenStatus[_tokenId] = 1;
        }
        teamRareIndex += num;
    }

    function claimTeamUncommon(uint num) external onlyOwner {
        require(teamUncommonIndex < 200, "No uncommon nfts left");
        uint256 start = TEAM_UNCOMMON_START + teamUncommonIndex;
        uint256 end = start + num;
        for (uint256 _tokenId = start; _tokenId < end; _tokenId++) {
            claimableAmount[_tokenId] = teamUncommonAllocation;
            _safeMint(msg.sender, _tokenId);
            tokenStatus[_tokenId] = 1;
        }
        teamUncommonIndex += num;
    }

    function claimTeamCommon(uint num) external onlyOwner {
        require(teamCommonIndex < 100, "No common nfts left");
        uint256 start = TEAM_COMMON_START + teamCommonIndex;
        uint256 end = start + num;
        for (uint256 _tokenId = start; _tokenId < end; _tokenId++) {
            claimableAmount[_tokenId] = teamCommonAllocation;
            _safeMint(msg.sender, _tokenId);
            tokenStatus[_tokenId] = 1;
        }
        teamCommonIndex += num;
    }

    function isTeamNft(uint256 _tokenId) private view returns (bool) {
        _tokenId = _tokenId % idIncrement;
        return TEAM_LEGENDARY_START <= _tokenId && _tokenId < TEAM_LEGENDARY_START + 1000;
    }
}
