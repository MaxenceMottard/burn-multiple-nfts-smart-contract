import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTManager", () => {
  const fixtures = async () => {
    const signers = await ethers.getSigners();

    const SampleNFTFactory = await ethers.getContractFactory("SampleNFT");
    const sampleNFT = await SampleNFTFactory.deploy();

    const NFTManagerFactory = await ethers.getContractFactory("NFTManager");
    const nftManager = await NFTManagerFactory.deploy(sampleNFT.address);

    return { sampleNFT, nftManager, signers };
  }

  it("Should list ids of minted tokens for a wallet", async () => {
    const { sampleNFT, nftManager, signers: [_, secondWallet, thirdWallet] } = await loadFixture(fixtures);

    await sampleNFT.mint(thirdWallet.address, 2);
    await sampleNFT.mint(secondWallet.address, 5);
    await sampleNFT.mint(thirdWallet.address, 3);

    const result = await nftManager.listOwnedTokensForCollection(sampleNFT.address, thirdWallet.address)
    expect(result.map(bigNumber => Number(bigNumber.toString()))).to.eql([0, 1, 7, 8, 9]);
  });

  it("Should send NFTs to burn address", async () => {
    const { sampleNFT, nftManager, signers: [_, secondWallet] } = await loadFixture(fixtures);

    await sampleNFT.mint(secondWallet.address, 5);
    await sampleNFT.connect(secondWallet).setApprovalForAll(nftManager.address, true)
    await nftManager.connect(secondWallet).burnMultipleNFTs(sampleNFT.address, secondWallet.address, [0, 3, 4])

    const result = await nftManager.listOwnedTokensForCollection(sampleNFT.address, secondWallet.address)
    expect(result.map(bigNumber => Number(bigNumber.toString()))).to.eql([1, 2]);
  });
});
