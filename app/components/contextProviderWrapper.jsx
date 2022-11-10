import DashboardProvider from "./store/DashboardProvider";
import EthersProvider from "./store/EthersProvider";
export default function ContextProviderWrapper({ children }) {

    return (
        <EthersProvider>
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </EthersProvider>
    );
}