const { ethers, upgrades } = require("hardhat");

async function main() {
  const UpgradeV1Contract = await ethers.getContractFactory("Upgrade_v1");
  console.log("Deploying Upgrade_v1");
  const upgradeV1 = await upgrades.deployProxy(UpgradeV1Contract, [5], {
    initializer: "update",
  });
  await upgradeV1.waitForDeployment();
  console.log("UpgradeV1 deployed to:", await upgradeV1.getAddress());
}

main();

// UpgradeV1 deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
