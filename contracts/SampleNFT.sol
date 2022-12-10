// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SampleNFT is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _nftIdCounter;

    constructor() ERC721("SampleNFT", "SNFT") {}

    function mint(address owner, uint numberToMint) external {
        for(uint i = 0 ; i < numberToMint ; i++) {
            _safeMint(owner, _nftIdCounter.current());
            _nftIdCounter.increment();
        }
    }
}
