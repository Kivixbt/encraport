// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import 'fhevm/lib/TFHE.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/// @title EncraPort Confidential Vault
contract EncraPort is Ownable {
    mapping(address => mapping(string => euint64)) internal balances;
    event Deposit(address indexed user, string symbol);

    constructor() Ownable(msg.sender) {}

    function deposit(string calldata symbol, bytes calldata encryptedAmount) public {
        euint64 amount = TFHE.asEuint64(encryptedAmount);
        euint64 currentBalance = balances[msg.sender][symbol];
        balances[msg.sender][symbol] = TFHE.add(currentBalance, amount);
        TFHE.allow(balances[msg.sender][symbol], address(this));
        TFHE.allow(balances[msg.sender][symbol], msg.sender);
        emit Deposit(msg.sender, symbol);
    }

    function getBalanceHandle(string calldata symbol) public view returns (euint64) {
        return balances[msg.sender][symbol];
    }
}

