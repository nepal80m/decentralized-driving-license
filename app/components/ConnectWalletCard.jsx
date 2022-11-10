'use client';

import { useEffect, useState } from "react";

const NETWORKS = {
    1: 'Ethereum Mainnet',
    5: 'Goerli Testnet',
    11155111: 'Sepolia Testnet',
    137: 'Polygon Mainnet',
    80001: 'Mumbai Testnet',
    56: 'BNB Smart Chain',
    1337: 'Localhost 8545',
};

export default function ConnectWalletCard({ connectWallet, networkError, dismissNetworkError, isConnecting }) {
    const [selectedNetwork, setSelectedNetwork] = useState();
    const [selectedAddress, setSelectedAddress] = useState(window.ethereum.selectedAddress);
    useEffect(() => {
        initNetwork();
    }, [])

    async function initNetwork() {
        const chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }))
        setSelectedNetwork(NETWORKS[chainId] || 'Unknown Network');

        window.ethereum.on("chainChanged", (chainId) => {
            setSelectedNetwork(NETWORKS[chainId] || 'Unknown Network');
            if (selectedAddress) {
                connectWallet();
            }
        });

        window.ethereum.on('accountsChanged', (accounts) => {
            setSelectedAddress(accounts[0]);
        });


    }

    return (
        <div>
            <div >
                Please connect to your wallet.
            </div>

            {networkError && (
                <div style={{ color: 'red' }}>{networkError}
                    <button onClick={dismissNetworkError}>X</button>
                </div>
            )
            }
            <div>

            </div>
            <div>
                {selectedAddress ?
                    <div>
                        <div>

                            {selectedAddress}
                        </div>
                        <div>

                            {selectedNetwork}
                        </div>
                    </div> :
                    <button
                        type="submit"
                        onClick={connectWallet}
                        disabled={isConnecting}
                    >
                        {isConnecting ? "Connecting..." :
                            "Connect Wallet"
                        }
                    </button>
                }
            </div>
        </div >


    )
}



