import { useReducer, useState } from "react";

import EthersContext from "./ethers-context";


const EthersProvider = (props) => {
    const [provider, setProvider] = useState();
    const [drivingLicense, setDrivingLicense] = useState();


    const ethersContext = {
        provider,
        drivingLicense,
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
