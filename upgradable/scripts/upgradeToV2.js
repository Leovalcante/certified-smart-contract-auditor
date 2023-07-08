const { ethers, upgrades } = require("hardhat");

async function main() {
  const UpgradeV2Contract = await ethers.getContractFactory("Upgrade_v2");
  console.log("Upgrading v1 to v2...");

  const upgradeV2 = await upgrades.upgradeProxy(
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    UpgradeV2Contract
  );
  console.log("UpgradeV1 has been updated to UpgradeV2");
  console.log("UpgradeV2 deployed to:", await upgradeV2.getAddress());
}

main();

// UpgradeV1 deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// UpgradeV2 deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
