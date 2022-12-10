import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SampleNFT", () => {
  const fixtures = async () => {
    const signers = await ethers.getSigners();

    const SampleNFTFactory = await ethers.getContractFactory("SampleNFT");
    const sampleNFT = await SampleNFTFactory.deploy();

    return { sampleNFT, signers };
  }

  it("Should mint X nft", async () => {
    const { sampleNFT, signers: [_, secondWallet] } = await loadFixture(fixtures);

    await sampleNFT.mint(secondWallet.address, 5);

    expect(await sampleNFT.balanceOf(secondWallet.address)).to.equal(5);
  });
});
