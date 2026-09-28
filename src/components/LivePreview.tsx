import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Chip from '@mui/material/Chip';
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

  const sx = {
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
    disabled: config.disabled,
    loading: config.loading,
    disableRipple: config.disableRipple,
    sx,
  } as const;

  // IconButton has no `variant`/`fullWidth` props; only Button supports them.
  const buttonOnlyProps = { variant: config.variant, fullWidth: config.fullWidth } as const;

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
      }}
    >
      <Stack direction="row" sx={{ px: 2, py: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Live Preview</Typography>
        <ToggleButtonGroup value={canvas} exclusive size="small" onChange={(_, v) => v && setCanvas(v)}>
          <ToggleButton value="light">
            <LightModeIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="dark">
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
          m: 2,
          mt: 0,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {config.iconOnly ? (
          <IconButton
            {...commonProps}
            aria-label={config.ariaLabel || undefined}
          >
            {startIcon || endIcon ? (
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
            startIcon={startIcon ? <startIcon.Component /> : undefined}
            endIcon={endIcon ? <endIcon.Component /> : undefined}
            aria-label={config.ariaLabel || undefined}
          >
            {config.label}
          </MuiButton>
        )}
      </Box>

      <Stack direction="row" spacing={1} sx={{ px: 2, pb: 2, alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Contrast ratio {ratio.toFixed(2)}:1
        </Typography>
        <Chip
          size="small"
          label={level}
          color={level === 'Fail' ? 'error' : level === 'AA' ? 'warning' : 'success'}
        />
        {config.iconOnly && !config.ariaLabel && (
          <Chip size="small" color="error" label="Missing aria-label" />
        )}
      </Stack>
    </Box>
  );
}
