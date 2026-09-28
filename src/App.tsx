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
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f97316',
    },
    background: {
      default: '#f8f7ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Google Sans Flex", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      fontVariationSettings: '"slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 0',
      fontOpticalSizing: 'auto',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
      fontVariationSettings: '"slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 0',
      fontOpticalSizing: 'auto',
    },
    body1: {
      fontVariationSettings: '"slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 0',
      fontOpticalSizing: 'auto',
    },
    body2: {
      fontVariationSettings: '"slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 0',
      fontOpticalSizing: 'auto',
    },
    caption: {
      fontVariationSettings: '"slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 0',
      fontOpticalSizing: 'auto',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Google Sans Flex", sans-serif',
          fontOpticalSizing: 'auto',
          fontVariationSettings: '"slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #ec4899 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.15)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.08)',
          border: '1px solid #e5e7eb',
          marginBottom: '10px',
          borderRadius: '12px !important',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#e5e7eb',
            },
            '&:hover fieldset': {
              borderColor: '#6366f1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366f1',
              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 600,
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
          elevation={0}
        >
          <Toolbar sx={{ py: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
                  ✨
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
                  MUI Button Designer
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                  Design beautiful buttons with live preview
                </Typography>
              </Box>
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
