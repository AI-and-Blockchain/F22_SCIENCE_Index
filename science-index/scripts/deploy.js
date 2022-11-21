const hre = require("hardhat");
const ethers = require("ethers");

async function main() {

  const ScienceIndex = await hre.ethers.getContractFactory("ScienceIndex");
  const scienceIndex = await ScienceIndex.deploy(ethers.utils.parseEther("2.753147"), ethers.utils.parseEther("0.01453348"), ethers.utils.parseEther("0.1060934"), ethers.utils.parseEther("0.001541024"), ethers.utils.parseEther("21660754"));

  await scienceIndex.deployed();

  console.log("ScienceIndex deployed to:", scienceIndex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
