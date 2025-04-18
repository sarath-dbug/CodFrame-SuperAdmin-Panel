import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material"
import {
  ArrowUpward as ArrowUpwardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Business as BusinessIcon,
  DonutLarge as DonutLargeIcon,
} from "@mui/icons-material"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend 
} from "recharts"

// Constants moved outside component
const monthlyAdminData = [
  { name: "Jan", admins: 4 },
  { name: "Feb", admins: 7 },
  { name: "Mar", admins: 10 },
  { name: "Apr", admins: 15 },
  { name: "May", admins: 18 },
  { name: "Jun", admins: 24 },
]

const statusColors = {
  active: "#4caf50",
  suspended: "#f44336"
}

const crmAdminsData = [
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
]

export default function DashboardContent() {
  const theme = useTheme()

  // Calculate statistics
  const totalAdmins = crmAdminsData.length
  const activeAdmins = crmAdminsData.filter(admin => admin.status === "active").length
  const suspendedAdmins = crmAdminsData.filter(admin => admin.status === "suspended").length
  const totalAgents = crmAdminsData.reduce((sum, admin) => sum + admin.agentsUsed, 0)
  const totalAgentLimit = crmAdminsData.reduce((sum, admin) => sum + admin.agentLimit, 0)
  const agentUtilization = totalAgentLimit === 0 ? 0 : (totalAgents / totalAgentLimit) * 100

  // Prepare pie chart data
  const statusDistributionData = [
    { name: "Active", value: activeAdmins, color: statusColors.active },
    { name: "Suspended", value: suspendedAdmins, color: statusColors.suspended },
  ]

  // Get recent admins sorted by creation date
  const recentAdmins = [...crmAdminsData]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Super Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="subtitle2">
                Total CRM Admins
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                  {totalAdmins}
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <PeopleIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="success.main" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpwardIcon fontSize="small" />
                12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="subtitle2">
                Active CRM Admins
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                  {activeAdmins}
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                  <BusinessIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="success.main" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpwardIcon fontSize="small" />
                8% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="subtitle2">
                Total Agents
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                  {totalAgents}
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                  <PersonAddIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="success.main" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpwardIcon fontSize="small" />
                15% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="subtitle2">
                Agent Utilization
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                  {agentUtilization.toFixed(1)}%
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                  <DonutLargeIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="success.main" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ArrowUpwardIcon fontSize="small" />
                5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Monthly Admin Growth Chart */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Monthly Admin Growth
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={monthlyAdminData}
                    aria-label="Monthly Admin Growth Chart"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="admins" 
                      fill={theme.palette.primary.main}
                      name="Admins"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Admin Status Distribution */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                CRM Admin Status Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip formatter={(value) => [`${value} admins`, 'Count']} />
                    <Legend />
                    <Pie 
                      data={statusDistributionData} 
                      dataKey="value" 
                      nameKey="name"
                      cx="50%" 
                      cy="50%" 
                      innerRadius="40%" 
                      outerRadius="70%"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}