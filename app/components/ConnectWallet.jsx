'use client';

import { useEffect, useState, useContext } from "react";

import EthersContext from "../store/ethers-context";
import DashboardContext from "../store/dashboard-context";

import contractAddress from '../../contracts/contract-address.json';
import DrivingLicenseArtifact from '../../contracts/DrivingLicense.json'
import ConnectWalletCard from '../components/ConnectWalletCard'
import NoWalletDetected from "../components/NoWalletDetected";

const REQUIRED_NETWORK_ID = 1337;

export default function ConnectWallet({ children }) {
    const [walletConnected, setWalletConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [networkError, setNetworkError] = useState('');
    const ethersCtx = useContext(EthersContext);
    const dashboardCtx = useContext(DashboardContext);

    useEffect(() => {
        if (window.ethereum === undefined) {
            return;
        }
        checkWalletConnection();
    }, [])



    async function checkWalletConnection() {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length == 0) {
            setWalletConnected(false);
        }
        else {

            connectWallet();
        }

    }


    async function connectWallet() {
        setIsConnecting(true)

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            if (error.code === 4001) {
                setNetworkError('Connection request was rejected.')
                console.log("Connection request was rejected.")
            } else {
                console.error(error);
            }
            setIsConnecting(false)
            return;
        }
        // console.log("Connected to metamask with account ", window.ethereum.selectedAddress);


        const chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }))
        if (chainId !== REQUIRED_NETWORK_ID) {
            setNetworkError(`Please connect Metamask to ${NETWORKS[REQUIRED_NETWORK_ID]}`);
            setIsConnecting(false)
            return;
        }


        window.ethereum.on("chainChanged", (_chainId) => {
            window.location.reload();
        });


        await initializeEthers();
        await fetchDashboardContents();


        setWalletConnected(true);
        setIsConnecting(false);


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


    async function fetchDashboardContents() {

        try {
            // ethersCtx.drivingLicense.isLicenseValid()
        }
        catch (error) {
            console.error(error)
            console.error('Failed to interact with the contract.')
            return;
        }

        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {
                setSelectedAddress()
            }
            else {
                setSelectedAddress(accounts[0])
            }
        });

    }


    if (window.ethereum === undefined) return <NoWalletDetected />;

    if (!walletConnected) return <ConnectWalletCard
        connectWallet={connectWallet}
        networkError={networkError}
        dismissNetworkError={() => setNetworkError()}
        isConnecting={isConnecting}

    />;

    return children;
}