import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MuiButton from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import type { Theme } from '@mui/material/styles';

import { useButtonConfigStore } from '../store/useButtonConfigStore';
import { getIconByName } from '../constants/icons';
import { getThemePaletteColor, canvasBackground } from '../utils/themeColors';
import { contrastRatio, contrastLevel } from '../utils/contrast';

export function LivePreview() {
  const config = useButtonConfigStore((s) => s.config);
  const [canvas, setCanvas] = useState<'light' | 'dark'>('light');

  const startIcon = getIconByName(config.startIcon, config.iconStyle);
  const endIcon = getIconByName(config.endIcon, config.iconStyle);

  // Map Google Font names to font-family values
  const fontFamilyMap: Record<string, string> = {
    'Figtree': '"Figtree", sans-serif',
    'Inter': '"Inter", sans-serif',
    'Lexend': '"Lexend", sans-serif',
    'Montserrat': '"Montserrat", sans-serif',
    'Open Sans': '"Open Sans", sans-serif',
    'Poppins': '"Poppins", sans-serif',
    'Raleway': '"Raleway", sans-serif',
    'Roboto': '"Roboto", sans-serif',
    'Work Sans': '"Work Sans", sans-serif',
  };

  const sx = {
    fontFamily: fontFamilyMap[config.fontFamily],
    fontWeight: config.fontWeight,
    textTransform: config.textTransformUppercase ? 'uppercase' : 'none',
    ...(config.colorMode === 'custom' && config.variant === 'contained'
      ? { backgroundColor: config.customColor, color: '#fff', '&:hover': { filter: 'brightness(0.92)' } }
      : {}),
    ...(config.colorMode === 'custom' && config.variant === 'outlined'
      ? { color: config.customColor, borderColor: config.customColor }
      : {}),
    ...(config.colorMode === 'custom' && config.variant === 'text'
      ? { color: config.customColor }
      : {}),
    borderRadius: `${config.borderRadius}px`,
    ...(config.elevation !== 2 ? { boxShadow: (theme: Theme) => theme.shadows[config.elevation] } : {}),
    ...(config.minWidth != null ? { minWidth: config.minWidth } : {}),
  };

  const commonProps = {
    color: config.colorMode === 'theme' ? config.color : undefined,
    size: config.size,
    disabled: config.disabled || config.loading,
    disableRipple: config.disableRipple,
    sx,
  } as const;

  // IconButton has no `variant`/`fullWidth` props; only Button supports them.
  const buttonOnlyProps = { variant: config.variant, fullWidth: config.fullWidth } as const;

  // Loading spinner - scale based on button size
  const spinnerSize = config.size === 'small' ? 16 : config.size === 'large' ? 24 : 20;
  const createSpinner = () => <CircularProgress size={spinnerSize} sx={{ color: 'inherit' }} />;

  // Contrast: bg = solid fill for contained, else canvas background.
  const bgHex =
    config.variant === 'contained'
      ? config.colorMode === 'custom'
        ? config.customColor
        : getThemePaletteColor(config.color).main
      : canvasBackground[canvas];
  const textHex =
    config.variant === 'contained'
      ? config.colorMode === 'custom'
        ? '#ffffff'
        : getThemePaletteColor(config.color).contrastText
      : config.colorMode === 'custom'
        ? config.customColor
        : getThemePaletteColor(config.color).main;
  const ratio = contrastRatio(bgHex, textHex);
  const level = contrastLevel(ratio);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: 3,
          py: 0,
          height: 70,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #f3f4f6',
          background: 'linear-gradient(135deg, #f8f7ff 0%, #f0f9ff 100%)',
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1, color: '#f97316' }}>
          Live Preview
        </Typography>
        <ToggleButtonGroup
          value={canvas}
          exclusive
          size="small"
          onChange={(_, v) => v && setCanvas(v)}
          sx={{
            '& .MuiToggleButton-root': {
              borderColor: '#e0e0e0',
              '&.Mui-selected': {
                backgroundColor: '#f0f0f0',
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
      </Stack>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: canvasBackground[canvas],
          transition: 'background-color 0.2s ease',
          m: 3,
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        {config.iconOnly ? (
          <IconButton
            {...commonProps}
            aria-label={config.ariaLabel || undefined}
          >
            {config.loading ? (
              createSpinner()
            ) : startIcon || endIcon ? (
              (() => {
                const Icon = (startIcon ?? endIcon)!.Component;
                return <Icon />;
              })()
            ) : null}
          </IconButton>
        ) : (
          <MuiButton
            {...commonProps}
            {...buttonOnlyProps}
            startIcon={
              config.loading && config.loadingShowText && config.loadingPosition === 'start'
                ? createSpinner()
                : startIcon
                  ? <startIcon.Component />
                  : undefined
            }
            endIcon={
              config.loading && config.loadingShowText && config.loadingPosition === 'end'
                ? createSpinner()
                : endIcon
                  ? <endIcon.Component />
                  : undefined
            }
            aria-label={config.ariaLabel || undefined}
          >
            {config.loading && !config.loadingShowText ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {createSpinner()}
              </Box>
            ) : (
              config.label
            )}
          </MuiButton>
        )}
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          px: 3,
          py: 2,
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f9f9f9',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          Contrast: {ratio.toFixed(2)}:1
        </Typography>
        <Chip
          size="small"
          label={level}
          color={level === 'Fail' ? 'error' : level === 'AA' ? 'warning' : 'success'}
          variant="outlined"
        />
        {config.iconOnly && !config.ariaLabel && (
          <Chip size="small" color="error" label="Missing aria-label" variant="outlined" />
        )}
      </Stack>
    </Box>
  );
}
