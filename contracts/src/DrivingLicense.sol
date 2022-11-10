// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

contract DrivingLicense {
    struct User {
        string name;
        address addr;
        bool active;
        uint256 licenseNumber;
    }

    mapping(address => User) public licenseInfo;
    uint256 licenseCount;
    address public owner;

    constructor() {
        owner = msg.sender;
        licenseCount = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function isLicenseValid(address _addr) external view returns (bool) {
        return licenseInfo[_addr].active;
    }

    function applyForLicense(string calldata _name) external {
        licenseCount++;
        licenseInfo[msg.sender] = User(_name, msg.sender, false, licenseCount);
    }

    function updateLicenseStatus(address _addr) external onlyOwner {
        licenseInfo[_addr].active = !licenseInfo[_addr].active;
    }
}
