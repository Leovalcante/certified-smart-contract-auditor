// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error StakeContract__TransferFailer();

contract StakeContract {
    mapping(address => uint) public s_balances;

    function stake(uint amount, address token) external returns (bool) {
        s_balances[msg.sender] += amount;
        bool success = IERC20(token).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        if (!success) revert StakeContract__TransferFailer();

        return success;
    }
}
