// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/StakeContract.sol";

import "../src/mocks/MockERC20.sol";
import "./utils/cheats.sol";

contract StakeContractTest is Test {
    Cheats internal constant cheats = Cheats(HEVM_ADDRESS);
    StakeContract public stateContract;
    MockERC20 public token;

    // uint public constant amount = 1e18;

    function setUp() public {
        stateContract = new StakeContract();
        token = new MockERC20();
    }

    function testStakingToken(uint16 amount) public {
        token.approve(address(stateContract), amount);
        cheats.roll(45);
        bool success = stateContract.stake(amount, address(token));
        assertTrue(success);
    }
}
