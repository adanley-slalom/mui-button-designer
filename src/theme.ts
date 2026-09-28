import { createTheme, type Theme } from '@mui/material/styles';

export type ColorMode = 'light' | 'dark';

export function getAppTheme(mode: ColorMode): Theme {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      background: {
        default: isDark ? '#121218' : '#f8f7ff',
        paper: isDark ? '#1c1c24' : '#ffffff',
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
        fontSize: '0.75rem',
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
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: '56px !important',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            '&:before': {
              display: 'none',
            },
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            marginBottom: '10px',
            borderRadius: '0 !important',
            transition: 'all 0.2s ease',
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
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: isDark ? '#33333e' : '#e5e7eb',
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
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: '0.875rem',
            fontWeight: 500,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            fontSize: '0.75rem',
            fontWeight: 500,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '0.9rem',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '0.9rem',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: '0.9rem',
          },
          input: {
            fontSize: '0.9rem',
          },
        },
      },
    },
  });
}
