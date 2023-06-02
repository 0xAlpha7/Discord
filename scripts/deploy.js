const hre = require("hardhat");
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const NAME = "Discord";
  const SYMBOL = "DC";

  const Discord = await ethers.getContractFactory("Discord");
  const discord = await Discord.deploy(NAME, SYMBOL);
  await discord.deployed();
  console.log("Contract deployed at: ", discord.address);

  //creating some channels
  const CHENNAL_NAMES = ["General", "Intro", "Stuff", "Random"];
  const COST = [tokens(1), tokens(0), tokens(0.25), tokens(0.002)];
  for (let i = 0; i < 4; i++) {
    const tx = await discord
      .connect(deployer)
      .createChanel(CHENNAL_NAMES[i], COST[i]);
    await tx.wait();
    console.log("created channel: ", CHENNAL_NAMES[i]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
