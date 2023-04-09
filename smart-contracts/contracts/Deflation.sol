// SPDX-License-Identifier: MIT
// 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e ( ETH-USD contract )
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Deflation is ERC20 {
    string private _name;
    string private _symbol;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, totalSupply_ * 10 * 18);
    }

    function swap(address from, address to) public {}

    function getName() public returns (string memory) {
        return name_;
    }
}
