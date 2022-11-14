const hre = require("hardhat");

async function main() {

  const ScienceIndex = await hre.ethers.getContractFactory("ScienceIndex");
  const scienceIndex = await ScienceIndex.deploy(3);

  await scienceIndex.deployed();

  console.log("ScienceIndex deployed to:", scienceIndex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
