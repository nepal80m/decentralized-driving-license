'use client';

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DashboardContext from "../store/dashboard-context";
export default function DashboardBase({ children }) {
    const dashboardCtx = useContext(DashboardContext);

    return (
        <>

            <div>
                <div>
                    Connected Address: {dashboardCtx.address || 'Not Connected'}
                </div>
                <div>

                    Welcome to the decentralized license system.
                </div>

                <ul>
                    <li>
                        <Link href='/'>Dashboard</Link>
                    </li>
                    {dashboardCtx.isAdmin &&

                        <>
                            <li>
                                <Link href='/requests'>Requests</Link>
                            </li>
                            <li>
                                <Link href='/admin'>Admins</Link>
                            </li>
                        </>

                    }

                </ul>
                {children}
            </div>



        </>


    )
}



