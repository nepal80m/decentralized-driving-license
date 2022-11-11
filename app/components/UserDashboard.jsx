'use client';

import { useContext, useEffect, useState } from "react";
import DashboardContext from "../store/dashboard-context";
import EthersContext from "../store/ethers-context";
export default function UserDashboard() {
    const ethersCtx = useContext(EthersContext);
    const dashboardCtx = useContext(DashboardContext);
    const [license, setLicense] = useState()
    const [registering, setRegistering] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [searched, setSearched] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        searchLicense();
    }, []);


    async function searchLicense() {
        try {
            const _licenseNumber = await ethersCtx.drivingLicense.holderAddressToLicenseNumber(dashboardCtx.address);

            if (Number(_licenseNumber) === 0) {
                setSearched(true);
                return;
            }
            const _license = await ethersCtx.drivingLicense.licenseNumberToLicense(_licenseNumber);
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
        setSearched(true);

    }


    async function handleRegister() {
        setRegistering(true);
        try {
            const txn = await ethersCtx.drivingLicense.applyForLicense(name, '');
            await ethersCtx.provider.getTransactionReceipt(txn.hash);
            setName('');
            setRegistrationMessage('')
            searchLicense();

        }
        catch (error) {
            console.error(error);
            setRegistrationMessage('Registration Failed. Try Again')
        }
        setRegistering(false);
    }


    if (!searched) {
        return <>
            Searching your license...
        </>
    }


    if (license) {
        return <>
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
        </>
    }

    return <>
        <div>
            <div>

                License Not Found.
            </div>
            Register your license.
        </div>
        <div>

            <label htmlFor="name">Name
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <button disabled={registering} onClick={handleRegister}>{registering ? 'Registering...' : 'Register'}</button>
            <div>
                {registrationMessage}
            </div>
        </div>
    </>







}



