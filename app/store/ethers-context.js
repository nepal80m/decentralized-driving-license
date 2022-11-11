import React from "react";

const EthersContext = React.createContext({
    selectedAddress: '',
    selectedNetwork: 0,
    provider: Object,
    drivingLicense: Object,
    setSelectedAddress: (String) => { },
    setSelectedNetwork: (Number) => { },
    setProvider: (Object) => { },
    setDrivingLicense: (Object) => { },
});

export default EthersContext;
