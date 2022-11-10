const hre = require("hardhat");
const fs = require('fs');
const path = require("path");
async function main() {

  const DrivingLicense = await hre.ethers.getContractFactory("DrivingLicense");
  const drivingLicense = await DrivingLicense.deploy();

  await drivingLicense.deployed();

  console.log(
    `Driving License Contract deployed
        to : ${drivingLicense.signer.address}
        by : ${drivingLicense.address}
    `
  );

  const contractsDir = path.join(__dirname, "..", "contracts");

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.js"),
    `export const contractAddress = "${drivingLicense.address}"`);

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({
      DrivingLicense: drivingLicense.address,
    }, undefined, 2)
  );



  const DrivingLicenseArtifact = artifacts.readArtifactSync("DrivingLicense");

  fs.writeFileSync(
    path.join(contractsDir, "DrivingLicense.json"),
    JSON.stringify(DrivingLicenseArtifact, null, 2)
  );




}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
