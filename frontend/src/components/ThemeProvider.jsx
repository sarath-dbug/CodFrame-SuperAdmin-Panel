import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", 
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#10b981", 
      dark: "#059669",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
    success: {
      main: "#10b981",
      light: "#d1fae5",
      dark: "#059669",
    },
    error: {
      main: "#ef4444",
      light: "#fee2e2",
      dark: "#b91c1c",
    },
    warning: {
      main: "#f59e0b",
      light: "#fef3c7",
      dark: "#d97706",
    },
    info: {
      main: "#3b82f6",
      light: "#dbeafe",
      dark: "#2563eb",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#f9fafb",
        },
      },
    },
  },
})


export function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
