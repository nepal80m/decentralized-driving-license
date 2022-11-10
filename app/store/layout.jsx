'use client';

import { useEffect, useState, useContext } from "react";

// import { ethers } from "hardhat";

import EthersContext from '../store/ethers-context';

// import { contractAddress } from "../contracts/contract-address";
import contractAddress from "../../contracts/contract-address.json";
import DrivingLicenseArtifact from "../../contracts/DrivingLicense.json";

import ConnectWallet from '../components/ConnectWalletCard'
import NoWalletDetected from "../components/NoWalletDetected";

export default function RootLayout({ children }) {
    const [authorized, setAuthorized] = useState(false);
    const [networkError, setNetworkError] = useState();
    // const ethersCtx = useContext(EthersContext)
    useEffect(() => {
        if (window.ethereum === undefined) {
            return;
        }
        checkWalletConnection();
    }, [])

    async function checkWalletConnection() {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length == 0) {
            setAuthorized(false);
        }
        else {
            setAuthorized(true);
        }

    }

    // if (!authorized) return <ConnectWallet />;


    if (window.ethereum === undefined) {
        return (
            <html lang="en">
                <body>
                    <NoWalletDetected />
                </body>
            </html>
        );
    }

    if (!authorized) {
        return (
            <html lang="en">
                <body>
                    <ConnectWallet />
                </body>
            </html>
        );
    }

    return (
        <html lang="en">
            <body>
                {/* <EthersContext.Provider value={account}> */}
                {children}
                {/* </EthersContext.Provider> */}

            </body>
        </html>
    );
}