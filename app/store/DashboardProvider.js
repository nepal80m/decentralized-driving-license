'use client';
import { useContext, useEffect, useState } from "react";
import DashboardContext from "./dashboard-context";
import EthersContext from "./ethers-context";

export default function DashboardProvider(props) {
    const ethersCtx = useContext(EthersContext)
    const [address, setAddress] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [user, setUser] = useState();
    const [requests, setRequests] = useState([]);




    const dashboardContext = {
        address,
        isAdmin,
        user,
        requests,
    };


    return (
        <DashboardContext.Provider value={dashboardContext}>
            {props.children}
        </DashboardContext.Provider>
    );
};

