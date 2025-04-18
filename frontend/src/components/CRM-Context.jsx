import { createContext, useContext, useState } from "react"

// Mock data for CRM Admins
const initialCrmAdmins = [
  {
    _id: "1",
    name: "Acme Corp",
    email: "admin@acme.com",
    agentLimit: 10,
    agentsUsed: 4,
    status: "active",
    createdAt: "2023-01-15T08:30:00Z",
    updatedAt: "2023-04-05T14:22:00Z",
  },
  {
    _id: "2",
    name: "TechSolutions Inc",
    email: "admin@techsolutions.com",
    agentLimit: 15,
    agentsUsed: 12,
    status: "active",
    createdAt: "2023-02-10T10:15:00Z",
    updatedAt: "2023-04-01T09:45:00Z",
  },
  {
    _id: "3",
    name: "Global Services",
    email: "admin@globalservices.com",
    agentLimit: 8,
    agentsUsed: 5,
    status: "active",
    createdAt: "2023-03-05T14:20:00Z",
    updatedAt: "2023-03-28T16:30:00Z",
  },
  {
    _id: "4",
    name: "Innovate LLC",
    email: "admin@innovate.com",
    agentLimit: 5,
    agentsUsed: 2,
    status: "suspended",
    createdAt: "2023-03-15T11:10:00Z",
    updatedAt: "2023-04-02T13:15:00Z",
  },
  {
    _id: "5",
    name: "DataFlow Systems",
    email: "admin@dataflow.com",
    agentLimit: 12,
    agentsUsed: 0,
    status: "active",
    createdAt: "2023-04-01T09:30:00Z",
    updatedAt: "2023-04-01T09:30:00Z",
  },
  {
    _id: "5",
    name: "Tech Systems",
    email: "admin@dataflow.com",
    agentLimit: 12,
    agentsUsed: 0,
    status: "active",
    createdAt: "2023-04-01T09:30:00Z",
    updatedAt: "2023-04-01T09:30:00Z",
  },
]

const CrmAdminContext = createContext(undefined)

export function CrmAdminProvider({ children }) {
  const [crmAdmins, setCrmAdmins] = useState(initialCrmAdmins)

  const addCrmAdmin = (admin) => {
    const newAdmin = {
      ...admin,
      _id: Math.random().toString(36).substr(2, 9),
    }

    setCrmAdmins([...crmAdmins, newAdmin])
  }

  const updateCrmAdmin = (id, updatedAdmin) => {
    setCrmAdmins(
      crmAdmins.map((admin) =>
        admin._id === id ? { ...admin, ...updatedAdmin, updatedAt: new Date().toISOString() } : admin,
      ),
    )
  }

  const deleteCrmAdmin = (id) => {
    setCrmAdmins(crmAdmins.filter((admin) => admin._id !== id))
  }

  return (
    <CrmAdminContext.Provider
      value={{
        crmAdmins,
        addCrmAdmin,
        updateCrmAdmin,
        deleteCrmAdmin,
      }}
    >
      {children}
    </CrmAdminContext.Provider>
  )
}

export function useCrmAdminContext() {
  const context = useContext(CrmAdminContext)
  if (context === undefined) {
    throw new Error("useCrmAdminContext must be used within a CrmAdminProvider")
  }
  return context
}
