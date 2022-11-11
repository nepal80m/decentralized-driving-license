import ConnectWallet from "./components/ConnectWallet";
import ContextProviderWrapper from "./components/ContextProviderWrapper";
import DashboardBase from "./components/DashboardBase";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ContextProviderWrapper>
          <ConnectWallet>
            <DashboardBase>

              {children}
            </DashboardBase>
          </ConnectWallet>
        </ContextProviderWrapper>
      </body>
    </html>
  );
}