const Web3 = require('web3');
const OracleChainlink = require('./build/contracts/OracleChainlink.json');



const init = async () => {
    const prov = new ethers.providers.InfuraProvider(network="goerli", process.env.INFURA_API_KEY);

    // Signer
    const signer = new ethers.Wallet("a3a8f8ff109b907efb8918c007ed3a2ff3f1ca99706c4326c570cfd7f94ac3f6", prov);


    const contract = new ethers.Contract("0xb60966c31d0e20f334598A695bcb65119BE53cb3", OracleChainlink.abi, signer);

    const hindex = await contract.RequestH_index();

}
