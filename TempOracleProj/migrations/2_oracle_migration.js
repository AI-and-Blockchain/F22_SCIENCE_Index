const OracleChainlink = artifacts.require('OracleChainlink')

module.exports = async (deployer, network, [defaultAccount]) => {

  deployer.deploy(OracleChainlink)

}
