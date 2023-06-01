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
  describe("joining channel", () => {
    const ID = 1;
    const AMOUNT = ethers.utils.parseEther("1");

    beforeEach(async () => {
      const transaction = await discord
        .connect(user)
        .mint(ID, { value: AMOUNT });
      await transaction.wait();
    });
    it("join the user", async () => {
      const result = await discord.hasJoined(ID, user.address);
      expect(result).to.equal(true);
    });
    it("increases total supply", async () => {
      let result = await discord.totalSupply();
      expect(result).to.equal(ID);
    });
    it("update the contract balance", async () => {
      let result = await ethers.provider.getBalance(discord.address);
      expect(result).to.equal(AMOUNT);
    });
  });
});
