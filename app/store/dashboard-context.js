import { createContext } from "react"
const DashboardContext = createContext({
    address: '',
    isAdmin: false,
    license: {
        licenseNumber: '',
        holderName: '',
        holderAddress: '',
        contentHash: '',
        valid: false,
    },
    requests: [{}, {}],
    setAddress: () => { },
    setIsAdmin: () => { },
    setLicense: () => { },
    setRequests: () => { },
})
export default DashboardContext