# SCIENCE-index Front End
## Design
The front end is built using react and connects to Ethereum based blockchains using ethers.  
The smart contract is written in solidity and deployed with hardhat. Hardhat is also used to run a local network.  
## How to Run locally
### Step 0
This only needs to be done the first time you download this respository.  
Run 'npm install' to install all the dependencies for this project.  
Make sure you have npm installed.
### Step 0.5 (Only if you are deploying the contract locally)
Run 'npx hardhat node' in the terminal to start the local blockchain network.  
This will output 20 accounts with 1000 ETH that you can import into metamask to use with the web page.  
You can connect to the local network at 'localhost 8545'.
### Step 1
If you need to deploy the smart contract, you can do so by running the following in the terminal:  
npx hardhat run scripts/deploy.js --network [destination]  
Replace [destination] with 'goerli' (without the 's) if you want to deploy to the Goerli test network.  
Note that this uses my Alchemy API Key and Goerli private key, so you may want to replace them in hardhat.config.js.  
Replase [destination] with 'localhost' (without the 's) if you want to deploy to the local network you started in step 0.  
#### Step 1.1
Once you've run the above command, it will out the new address for the smart contract.  
Update the scienceIndexAddress constant in 'scr/App.js' with this new value.
#### Step 1.2
If you modified the smart contract such that its ABI is now different, you need to copy the contents of 'artifacts/contracts/scienceIndex.sol/ScienceIndex.json' to 'src/scienceIndexAbi.json'. 
### Step 2
To run the website, run 'npm start' and it'll be accessible at 'localhost:3000/' in your web browser.