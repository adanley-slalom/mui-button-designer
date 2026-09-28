import { useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeProvider } from '@mui/material/styles';

import { ControlPanel } from './components/ControlPanel';
import { LivePreview } from './components/LivePreview';
import { CodePanel } from './components/CodePanel';
import { getAppTheme, type ColorMode } from './theme';
import { ColorModeContext } from './context/ColorModeContext';

export default function App() {
  const [mode, setMode] = useState<ColorMode>('light');
  const appTheme = useMemo(() => getAppTheme(mode), [mode]);
  const colorModeValue = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ColorModeContext.Provider value={colorModeValue}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
          }}
        >
          {/* Header */}
          <AppBar
            position="static"
            elevation={0}
          >
            <Toolbar sx={{ py: 1, px: 4, justifyContent: 'space-between', minHeight: 56 }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
                MUI Button Designer
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                  Create customized MUI buttons and export the code
                </Typography>
                <ToggleButtonGroup
                  value={mode}
                  exclusive
                  size="small"
                  onChange={(_, v) => v && setMode(v)}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    '& .MuiToggleButton-root': {
                      border: 'none',
                      color: 'rgba(255,255,255,0.7)',
                      '&.Mui-selected': {
                        bgcolor: 'rgba(255, 255, 255, 0.25)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.3)',
                        },
                      },
                    },
                  }}
                >
                  <ToggleButton value="light" title="Light mode">
                    <LightModeIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="dark" title="Dark mode">
                    <DarkModeIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
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
                borderRight: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
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
                  backgroundColor: 'background.paper',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
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
                  backgroundColor: 'background.paper',
                  overflow: 'hidden',
                }}
              >
                <CodePanel />
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
