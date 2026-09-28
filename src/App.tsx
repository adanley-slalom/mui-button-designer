import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ControlPanel } from './components/ControlPanel';
import { LivePreview } from './components/LivePreview';
import { CodePanel } from './components/CodePanel';

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          marginBottom: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fafafa',
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          elevation={1}
          sx={{
            borderBottom: '1px solid #e0e0e0',
            background: '#ffffff',
            color: 'text.primary',
          }}
        >
          <Toolbar sx={{ py: 2, px: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  Ⓜ
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                MUI Button Designer
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
          {/* Control Panel */}
          <Box
            sx={{
              width: 340,
              flexShrink: 0,
              borderRight: '1px solid #e0e0e0',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ControlPanel />
          </Box>

          {/* Preview and Code Section */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
            {/* Live Preview */}
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e0e0e0',
                overflow: 'hidden',
              }}
            >
              <LivePreview />
            </Box>

            {/* Code Panel */}
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <CodePanel />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
