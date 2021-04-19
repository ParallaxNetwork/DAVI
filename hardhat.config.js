require('dotenv').config();
require('@nomiclabs/hardhat-truffle5');
require('hardhat-dependency-compiler');

const MNEMONIC = process.env.REACT_APP_KEY_MNEMONIC;

module.exports = {
  paths: {
    sources: "./src", // Use src folder isntead of contracts to avoid having empty conrtracts folder
  },
  dependencyCompiler: {
    paths: [
      'dxdao-contracts/contracts/dxdao/DxAvatar.sol',
      'dxdao-contracts/contracts/dxdao/DxController.sol',
      'dxdao-contracts/contracts/dxdao/DxReputation.sol',
      'dxdao-contracts/contracts/dxdao/DXDVotingMachine.sol',
      'dxdao-contracts/contracts/dxdao/DxToken.sol',
      'dxdao-contracts/contracts/utils/Multicall.sol',
      'dxdao-contracts/contracts/schemes/WalletScheme.sol',
      'dxdao-contracts/contracts/schemes/PermissionRegistry.sol',
      'dxdao-contracts/contracts/test/ERC20Mock.sol'
    ],
  },
  solidity: {
    compilers: [
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      }
    ]
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: { mnemonic: MNEMONIC },
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      gasLimit: 9000000,
      gasPrice: 10000000000, // 10 gwei
      timeout: 60000
    }  
  }
};