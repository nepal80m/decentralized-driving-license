// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";

contract DrivingLicense {
    address public owner;
    mapping(address => bool) public admins;

    using Counters for Counters.Counter;
    Counters.Counter private _licenseNumbers;

    struct License {
        uint256 licenseNumber;
        string holderName;
        address holderAddress;
        string contentHash;
        bool valid;
    }

    mapping(uint256 => License) public licenseNumberToLicense;

    constructor() {
        owner = msg.sender;
    }

    // Events
    event LicenseRegistered(
        uint256 timestamp,
        uint256 licenseNumber,
        string holderName,
        address holderAddress,
        string contentHash,
        bool valid
    );
    event LicenseUpdated(
        uint256 timestamp,
        address updater,
        uint256 licenseNumber,
        string holderName,
        address holderAddress,
        string contentHash,
        bool valid
    );

    // Modifiers

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    modifier onlyAdmins() {
        require(
            admins[msg.sender] || msg.sender == owner,
            "Only authorized admins can call this function"
        );
        _;
    }

    modifier onlyHolderOrAdmins(uint256 _licenseNumber) {
        require(
            msg.sender ==
                licenseNumberToLicense[_licenseNumber].holderAddress ||
                admins[msg.sender] ||
                msg.sender == owner,
            "Only the license holder or authorized admins can call this function"
        );
        _;
    }

    modifier licenseExists(uint256 _licenseNumber) {
        require(
            _licenseNumber <= _licenseNumbers.current(),
            "License Doesnot exists"
        );
        _;
    }

    // Functions

    // Admin Stuffs
    function registerAdmin(address _adminAddress) external onlyAdmins {
        admins[_adminAddress] = true;
    }

    function removeAdmin(address _adminAddress) external onlyAdmins {
        admins[_adminAddress] = false;
    }

    // License Stuffs
    function applyForLicense(
        string calldata _holderName,
        string calldata _contentHash
    ) external {
        _licenseNumbers.increment();
        uint256 newLicenseNumber = _licenseNumbers.current();

        licenseNumberToLicense[newLicenseNumber] = License(
            newLicenseNumber,
            _holderName,
            msg.sender,
            _contentHash,
            false
        );
        emit LicenseRegistered(
            block.timestamp,
            newLicenseNumber,
            _holderName,
            msg.sender,
            _contentHash,
            false
        );
    }

    function updateLicenseHolderName(
        uint256 _licenseNumber,
        string calldata _holderName
    ) external onlyAdmins licenseExists(_licenseNumber) {
        License memory _license = licenseNumberToLicense[_licenseNumber];
        _license.holderName = _holderName;
        emit LicenseUpdated(
            block.timestamp,
            msg.sender,
            _licenseNumber,
            _license.holderName,
            _license.holderAddress,
            _license.contentHash,
            _license.valid
        );
    }

    function updateLicenseHolderAddress(
        uint256 _licenseNumber,
        address _holderAddress
    ) external onlyAdmins licenseExists(_licenseNumber) {
        License memory _license = licenseNumberToLicense[_licenseNumber];
        _license.holderAddress = _holderAddress;
        emit LicenseUpdated(
            block.timestamp,
            msg.sender,
            _licenseNumber,
            _license.holderName,
            _license.holderAddress,
            _license.contentHash,
            _license.valid
        );
    }

    function updateLicenseContentHash(
        uint256 _licenseNumber,
        string calldata _contentHash
    ) external onlyAdmins licenseExists(_licenseNumber) {
        License memory _license = licenseNumberToLicense[_licenseNumber];
        _license.contentHash = _contentHash;
        emit LicenseUpdated(
            block.timestamp,
            msg.sender,
            _licenseNumber,
            _license.holderName,
            _license.holderAddress,
            _license.contentHash,
            _license.valid
        );
    }

    function updateLicenseValidity(uint256 _licenseNumber, bool _valid)
        external
        onlyAdmins
    {
        License memory _license = licenseNumberToLicense[_licenseNumber];
        _license.valid = _valid;
        emit LicenseUpdated(
            block.timestamp,
            msg.sender,
            _licenseNumber,
            _license.holderName,
            _license.holderAddress,
            _license.contentHash,
            _license.valid
        );
    }

    // function getUnverifiedLicenses()external view returns(uint256[] memory){
    //     uint256 unverifiedLicenseCount=0;
    //     for(uint256 i=1; i<=_licenseNumbers.current();i++){
    //         if(!licenseNumberToLicense[i].valid){
    //             unverifiedLicenseCount++;
    //         }
    //     }

    //     uint256[] memory unverifiedLicenses=new uint256[](unverifiedLicenseCount);
    //     uint256 counter=0;
    //     for(uint256 i=1; i<=_licenseNumbers.current();i++){
    //         if(!licenseNumberToLicense[i].valid){
    //             unverifiedLicenses[counter]=i;
    //             counter++;

    //         }
    //     }
    //     return unverifiedLicenses;
    // }
}
