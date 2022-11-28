const Ethers = require("ethers");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ScienceIndex = await ethers.getContractFactory("ScienceIndex");
  const scienceIndex = await ScienceIndex.deploy(Ethers.utils.parseEther("2.75315"), Ethers.utils.parseEther("0.01453"), Ethers.utils.parseEther("0.10609"), Ethers.utils.parseEther("0.00154"), 21660754, Ethers.utils.parseEther("0.0002418739"), Ethers.utils.parseEther("3.605098"));

  console.log("ScienceIndex address:", scienceIndex.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });