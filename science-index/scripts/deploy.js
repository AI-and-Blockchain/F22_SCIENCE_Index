const hre = require("hardhat");

async function main() {

  const ScienceIndex = await hre.ethers.getContractFactory("ScienceIndex");
  const scienceIndex = await ScienceIndex.deploy(2.753147*1e18,0.01453348*1e18,0.1060934*1e18,0.001541024*1e18, 21660754*1e18);

  await scienceIndex.deployed();

  console.log("ScienceIndex deployed to:", scienceIndex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
