'use client';
import { useReducer, useState } from "react";

import EthersContext from "./ethers-context";


const EthersProvider = (props) => {
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedNetwork, setSelectedNetwork] = useState();
    const [provider, setProvider] = useState();
    const [drivingLicense, setDrivingLicense] = useState();


    const ethersContext = {
        selectedAddress,
        selectedNetwork,
        provider,
        drivingLicense,
        setSelectedAddress,
        setSelectedNetwork,
        setProvider,
        setDrivingLicense,
    };


    return (
        <EthersContext.Provider value={ethersContext}>
            {props.children}
        </EthersContext.Provider>
    );
};

export default EthersProvider;
