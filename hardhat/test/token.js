const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
  let owner, addr1, addr2, addrs;
  let Token;
  let hardhatToken;

  beforeEach(async () => {
    // A Signer in Ethers.js is an object that represents an Ethereum account.
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    // Get and deploy contract
    Token = await ethers.getContractFactory("Token");
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async () => {
      // Get owner balance
      const ownerBalance = await hardhatToken.balanceOf(owner.address);

      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", async () => {
    it("Should transfer tokens between accounts", async () => {
      // Transfer tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 50);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
      // Transfer tokens from addr1 to addr2
      // We specify ".connect(signer)" to specify the user who perform the operation
      await hardhatToken.connect(addr1).transfer(addr2.address, 25);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(25);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(25);
    });

    it("Should fail if sender does not have enough tokens", async () => {
      const initialTokenBalance = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 100)
      ).to.be.revertedWith("Not enough tokens");
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialTokenBalance
      );
    });

    it("Should update balances after transfers", async () => {
      const initialTokenBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(addr1.address, 50);
      await hardhatToken.transfer(addr2.address, 50);

      const finalTokenBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalTokenBalance).to.equal(initialTokenBalance - 100);

      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });
  });
});
