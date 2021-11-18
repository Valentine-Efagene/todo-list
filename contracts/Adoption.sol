// https://www.trufflesuite.com/tutorial

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Adoption {
  address[16] public adopters;

  function adopt(uint256 petId) public returns (uint256) {
    require(petId >= 0 && petId <= 15);
    adopters[petId] = msg.sender;
    return petId;
  }

  function getAdopters() public view returns (address[16] memory) {
    return adopters;
  }
}
