const Ethers = require("ethers");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ScienceIndex = await ethers.getContractFactory("ScienceIndex");
  const scienceIndex = await ScienceIndex.deploy(Ethers.utils.parseEther("1.71933"), Ethers.utils.parseEther("0.06902"), Ethers.utils.parseEther("0.10867"), Ethers.utils.parseEther("0.00304"), 21660754, Ethers.utils.parseEther("0.0002418739"), Ethers.utils.parseEther("3.605098"));

  console.log("ScienceIndex address:", scienceIndex.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });