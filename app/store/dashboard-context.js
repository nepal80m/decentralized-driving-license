import { createContext } from "react"
const DashboardContext = createContext({
    isAdmin: false,
    user: {
        id: '',
        address: '',
        name: '',
        isActive: false,
    },
    requests: [{}, {}],
    initialize: () => { },
})
export default DashboardContext