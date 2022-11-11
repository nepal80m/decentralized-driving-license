'use client';

import { useContext, useEffect, useState } from "react";
import DashboardContext from "../store/dashboard-context";
import EthersContext from "../store/ethers-context";
export default function AdminDashboard() {
    const ethersCtx = useContext(EthersContext);
    const dashboardCtx = useContext(DashboardContext);
    const [licenseNumberInput, setLicenseNumberInput] = useState('')
    const [license, setLicense] = useState()
    const [notFoundMessage, setNotFoundMessage] = useState('');


    async function handleLicenseSearch() {
        try {
            const _licenseNumber = Number(licenseNumberInput);
            const _license = await ethersCtx.drivingLicense.licenseNumberToLicense(_licenseNumber);
            console.log(_license.holderName);
            if (Number(_license.licenseNumber) === 0) {
                setNotFoundMessage('License Not Found.');
                return;
            }
            setLicense({
                licenseNumber: Number(_license.licenseNumber),
                holderName: _license.holderName,
                holderAddress: _license.holderAddress,
                valid: _license.valid,
            })
        }
        catch (error) {
            console.error(error);
        }
        setNotFoundMessage('');


    }


    return (
        <>
            <div>
                <label htmlFor="licenseNumber">
                    Search license.
                </label>
                <input type="text" id="licenseNumber" value={licenseNumberInput} onChange={e => { setLicenseNumberInput(e.target.value) }} />
                <button type="submit" onClick={handleLicenseSearch}>Search</button>
            </div>
            <div>
                {notFoundMessage}
                {license && <>
                    <div>
                        License Number: {license.licenseNumber}
                    </div>
                    <div>
                        License Holder: {license.holderName}
                    </div>
                    <div>
                        License Holder Address: {license.holderAddress}
                    </div>
                    <div>
                        Valid: {license.valid ? '✅' : '❌'}
                    </div>
                </>}
            </div>
        </>
    )


}



