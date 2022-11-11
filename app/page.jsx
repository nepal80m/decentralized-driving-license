'use client';

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DashboardContext from "./store/dashboard-context";
export default function HomePage() {
  const dashboardCtx = useContext(DashboardContext);

  // useEffect(() => {
  //   fetchUserDetail()
  // })


  return (
    <>

      <div>
        Welcome to the decentralized license system.

      </div>

      <div>
        Navigate through the link to
      </div>
    </>


  )
}



