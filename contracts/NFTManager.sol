// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTManager is Ownable {
    using Counters for Counters.Counter;

    address _burnAddress;

    constructor(address burnAddress) {
        _burnAddress = burnAddress;
        transferOwnership(msg.sender);
    }

    function listOwnedTokensForCollection(ERC721Enumerable collection, address ownerAddress) external view returns(uint256[] memory) {
        uint256 counter = 0;
        uint256 numberOfOwnedTokens = collection.balanceOf(ownerAddress);
        uint256[] memory tokenIDs = new uint256[](numberOfOwnedTokens);

        for(uint i = 0 ; i < collection.totalSupply(); i++) {
            if(ownerAddress == collection.ownerOf(i)) {
                tokenIDs[counter] = i;
                counter++;
            }
        }

        return tokenIDs;
    }

    function burnMultipleNFTs(ERC721 collection, address ownerAddress, uint256[] memory tokenIDs) external {
        for(uint i = 0 ; i < tokenIDs.length; i++) {
            collection.transferFrom(ownerAddress, _burnAddress, tokenIDs[i]);
        }
    }
}
