import React from "react";

const EthersContext = React.createContext({
    provider: Object,
    drivingLicense: Object,
    setProvider: (Object) => { },
    setDrivingLicense: (Object) => { },
});

export default EthersContext;
