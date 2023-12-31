// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "HardhHat Token";
    string public symbol = "HHT";
    uint public totalSupply = 100000;

    address public owner;

    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log("Sender balance is %s token", balances[msg.sender]);
        console.log("Sender is sending %s tokens to %s address", amount, to);
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }

    function test1() external view {
        for (uint i = 0; i < 5; i++) {
            console.log(i);
        }
    }

    function test2() external view {
        for (uint i = 0; i < 5; ++i) {
            console.log(i);
        }
    }
}
