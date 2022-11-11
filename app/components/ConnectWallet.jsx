'use client';

import { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import EthersContext from "../store/ethers-context";
import DashboardContext from "../store/dashboard-context";

import contractAddress from '../../contracts/contract-address.json';
import DrivingLicenseArtifact from '../../contracts/DrivingLicense.json'
import ConnectWalletCard from '../components/ConnectWalletCard'
import NoWalletDetected from "../components/NoWalletDetected";



export default function ConnectWallet({ children }) {
    const [walletConnected, setWalletConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const ethersCtx = useContext(EthersContext);
    const dashboardCtx = useContext(DashboardContext);






    // TODO:Check if  window.reload() is required on chain change


    async function initialize() {
        setIsLoading(true);
        const _ethersCtx = await initializeEthers();
        await fetchDashboardContents(_ethersCtx);
        // setWalletConnected(true);
        setIsLoading(false);
    }



    async function initializeEthers() {

        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        ethersCtx.setProvider(_provider)
        const _drivingLicense = new ethers.Contract(
            contractAddress.DrivingLicense,
            DrivingLicenseArtifact.abi,
            _provider.getSigner(0)
        );

        ethersCtx.setDrivingLicense(_drivingLicense)
        return { provider: _provider, drivingLicense: _drivingLicense }
    }


    async function fetchDashboardContents(_ethersCtx) {
        const selectedAddress = window.ethereum.selectedAddress;
        dashboardCtx.setAddress(selectedAddress);





        try {
            const isAdmin = await _ethersCtx.drivingLicense.admins(selectedAddress);
            const owner = await _ethersCtx.drivingLicense.owner();
            const isOwner = owner.toLowerCase() === selectedAddress.toLowerCase();

            dashboardCtx.setIsAdmin(isAdmin || isOwner)

            if (!isAdmin) {
                // fetch license data
            }
            else {
                // fetch requests
            }
            //     address: '',
            //     isAdmin: false,
            //     license: {
            //     licenseNumber: '',
            //     holderName: '',
            //     holderAddress: '',
            //     contentHash: '',
            //     valid: false,
            // },
            // requests: [{}, {}],
            // ethersCtx.drivingLicense.admins()
        }
        catch (error) {
            console.error(error)
            console.error('Failed to interact with the contract.')
            return;
        }
    }


    if (window.ethereum === undefined) return <NoWalletDetected />;





    if (!walletConnected) return <ConnectWalletCard
        // login={initialize}
        login={() => {
            setWalletConnected(true);
            initialize();
        }}
        logout={() => setWalletConnected(false)}
    />;

    if (isLoading) {
        return <>
            Fetching Data....
        </>
    }

    return children;
}