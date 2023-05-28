const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Discord", () => {
  describe("development", () => {
    it("Sets the name and symbol", async () => {
      const Discord = await ethers.getContractFactory("Discord");
      const discord = await Discord.deploy("Discord", "DC");
      let name = await discord.name();
      let symbol = await discord.symbol();
      expect(name).to.equal("Discord");
      expect(symbol).to.equal("DC");
    });
  });
});
