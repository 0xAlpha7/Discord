const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Discord", () => {
  let Discord, deployer, user;
  let discord;
  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();
    Discord = await ethers.getContractFactory("Discord");
    discord = await Discord.deploy("Discord", "DC");
    const transaction = await discord
      .connect(deployer)
      .createChanel("General", tokens(1));
  });
  describe("development", () => {
    it("Sets the name", async () => {
      let name = await discord.name();
      expect(name).to.equal("Discord");
    });
    it("Sets the symbol", async () => {
      let symbol = await discord.symbol();
      expect(symbol).to.equal("DC");
    });
    it("Sets the owner", async () => {
      let owner = await discord.owner();
      expect(owner).to.equal(deployer.address);
    });
  });
  describe("creating channels", () => {
    it("Returns total channels", async () => {
      let result = await discord.totalChannels();
      expect(result).to.equal(1);
    });
    it("Returns channels attributes", async () => {
      let channel = await discord.getChannel(1);
      expect(channel.id).to.equal(1);
      expect(channel.name).to.equal("General");
      expect(channel.cost).to.equal(tokens(1));
    });
  });
});
