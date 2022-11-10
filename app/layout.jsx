'use client'
import ConnectWallet from "./components/ConnectWallet";
import ContextProviderWrapper from "./components/contextProviderWrapper";
import DashboardProvider from "./store/DashboardProvider";
import EthersProvider from "./store/EthersProvider";
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ContextProviderWrapper>
          <ConnectWallet>
            {children}
          </ConnectWallet>
        </ContextProviderWrapper>
      </body>
    </html>
  );
}