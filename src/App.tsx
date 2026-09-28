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
  palette: { mode: 'light' },
});

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Toolbar variant="dense">
            <Typography variant="h6" component="div">
              MUI Button Designer
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <Box sx={{ width: 340, flexShrink: 0, borderRight: '1px solid', borderColor: 'divider' }}>
            <ControlPanel />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <LivePreview />
            </Box>
            <Divider />
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <CodePanel />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
