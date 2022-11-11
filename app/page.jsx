'use client';

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import DashboardContext from "./store/dashboard-context";
import EthersContext from "./store/ethers-context";
export default function HomePage() {
  const dashboardCtx = useContext(DashboardContext);

  if (dashboardCtx.isAdmin) {
    return <AdminDashboard />

  }

  return <UserDashboard />
}



