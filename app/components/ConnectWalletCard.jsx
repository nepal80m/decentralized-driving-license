'use client';

import { useCallback, useContext, useEffect, useState } from "react";
import EthersContext from "../store/ethers-context";

const REQUIRED_NETWORK_ID = 1337;
export const NETWORKS = {
    1: 'Ethereum Mainnet',
    5: 'Goerli Testnet',
    11155111: 'Sepolia Testnet',
    137: 'Polygon Mainnet',
    80001: 'Mumbai Testnet',
    56: 'BNB Smart Chain',
    1337: 'Localhost 8545',
};

export default function ConnectWalletCard({ login, logout
}) {
    const ethersCtx = useContext(EthersContext);
    const [networkError, setNetworkError] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const attemptReConnect = useCallback(() => {
        setIsLoading(true);
        const account = window.ethereum.selectedAddress;
        ethersCtx.setSelectedAddress(account);
        if (!account) {
            logout()
            setIsLoading(false);
            return;
        }

        const chainId = parseInt(window.ethereum.chainId);
        ethersCtx.setSelectedNetwork(chainId);

        if (chainId !== REQUIRED_NETWORK_ID) {
            logout();
            setIsLoading(false);

            setNetworkError(`Please connect Metamask to ${NETWORKS[REQUIRED_NETWORK_ID]}`);
            return;
        }
        setNetworkError();
        login();
        setIsLoading(false);
    }, [ethersCtx, login, logout])


    useEffect(() => {
        attemptReConnect();
        window.ethereum.on('accountsChanged', (_) => {
            attemptReConnect();
        })
        window.ethereum.on('chainChanged', (_) => {
            attemptReConnect();
        })
    }, [attemptReConnect])



    // async function asyncAttemptReConnect() {
    //     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    //     ethersCtx.setSelectedAddress(accounts[0]);
    //     if (accounts.length === 0) {
    //         logout()
    //         return;
    //     }


    //     const chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }))
    //     ethersCtx.setSelectedNetwork(chainId);

    //     if (chainId !== REQUIRED_NETWORK_ID) {
    //         logout();
    //         setNetworkError(`Please connect Metamask to ${NETWORKS[REQUIRED_NETWORK_ID]}`);
    //         return;
    //     }

    //     setNetworkError();

    //     console.log('Can finally do fetching...');

    //     login();

    // }

    async function sendWalletConnectRequest() {
        setIsConnecting(true);
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
        setIsConnecting(false)

    }

    if (isLoading) {
        return <>
            Loggin In....
        </>
    }

    return (
        <div>
            <div >
                Please connect to your wallet.
            </div>

            {networkError && (
                <div style={{ color: 'red' }}>{networkError}
                    <button onClick={() => setNetworkError()}>X</button>
                </div>
            )
            }
            <div>

            </div>
            <div>
                {ethersCtx.selectedAddress ?
                    <div>
                        <div>

                            {ethersCtx.selectedAddress}
                        </div>
                        <div>

                            {NETWORKS[ethersCtx.selectedNetwork] || 'Unknown Network'}
                        </div>
                    </div> :
                    <button
                        type="submit"
                        onClick={sendWalletConnectRequest}
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



