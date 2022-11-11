'use client';
import { useContext, useEffect, useState } from "react";
import DashboardContext from "./dashboard-context";
import EthersContext from "./ethers-context";

export default function DashboardProvider(props) {
    const ethersCtx = useContext(EthersContext)
    const [address, setAddress] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [license, setLicense] = useState();
    const [requests, setRequests] = useState([]);




    const dashboardContext = {
        address,
        isAdmin,
        license,
        requests,
        setAddress,
        setIsAdmin,
        setLicense,
        setRequests,
    };


    return (
        <DashboardContext.Provider value={dashboardContext}>
            {props.children}
        </DashboardContext.Provider>
    );
};

