// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Test {
    function sendTo(address receiver, uint amount) public {
        require(payable(receiver).send(amount));
    }
}
