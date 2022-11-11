'use client';

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DashboardContext from "./store/dashboard-context";
export default function DashboardBase({ children }) {
    const dashboardCtx = useContext(DashboardContext);

    return (
        <>

            <div>
                <div>
                    Connected Address: {dashboardCtx.address || 'Not Connected'}
                </div>
                <ul>
                    {dashboardCtx.isAdmin ?

                        <>
                            <li>
                                <Link href='/requests'>Requests</Link>
                            </li>
                            <li>
                                <Link href='/admin'>Admins</Link>
                            </li>
                        </>
                        :
                        <li>
                            <Link href='/license'>License</Link>
                        </li>
                    }

                </ul>
                {children}
            </div>

            Welcome to the decentralized license system.


        </>


    )
}



