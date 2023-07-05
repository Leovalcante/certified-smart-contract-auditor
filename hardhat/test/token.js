const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
  it("Deployment should assign the total supply to the owner", async () => {
    // A Signer in Ethers.js is an object that represents an Ethereum account.
    const [owner] = await ethers.getSigners();
    // Get and deploy contract
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();
    // Get owner balance
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async () => {
    // A Signer in Ethers.js is an object that represents an Ethereum account.
    const [owner, addr1, addr2] = await ethers.getSigners();
    // Get and deploy contract
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();

    // Transfer tokens
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // We specify ".connect(signer)" to specify the user who perform the operation
    await hardhatToken.connect(addr1).transfer(addr2.address, 25);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(25);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(25);
  });
});
