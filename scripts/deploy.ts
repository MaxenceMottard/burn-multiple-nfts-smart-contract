import { ethers } from "hardhat";

async function main() {
  const NFTManagerFactory = await ethers.getContractFactory("NFTManager");
  const nftManager = await NFTManagerFactory.deploy("0x0000000000000000000000000000000000000000");

  await nftManager.deployed();

  console.log(`NFTManager contract deployed to ${nftManager.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
