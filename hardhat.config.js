require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
// require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  solidity: "0.8.3",
};
