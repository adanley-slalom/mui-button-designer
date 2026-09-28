import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { ICONS, getIconByName, type IconStyle } from '../constants/icons';

interface IconPickerProps {
  label: string;
  value: string | null;
  style: IconStyle;
  onStyleChange: (style: IconStyle) => void;
  onChange: (name: string | null) => void;
}

export function IconPicker({ label, value, style, onStyleChange, onChange }: IconPickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const selected = value ? getIconByName(value, style) : undefined;

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block' }}>
        {label}
      </Typography>
      <Button
        size="small"
        variant="outlined"
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={selected ? <selected.Component fontSize="small" /> : undefined}
      >
        {value || 'None'}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 1.5, minWidth: 300 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Icon Style
            </Typography>
            <ToggleButtonGroup
              value={style}
              exclusive
              onChange={(_, newStyle) => {
                if (newStyle) onStyleChange(newStyle);
              }}
              size="small"
              fullWidth
            >
              <ToggleButton value="solid">Solid</ToggleButton>
              <ToggleButton value="outlined">Outlined</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Select Icon
              </Typography>
              {value && (
                <Button
                  size="small"
                  variant="text"
                  sx={{ textTransform: 'none', fontSize: '0.75rem', p: 0.25 }}
                  onClick={() => {
                    onChange(null);
                    setAnchorEl(null);
                  }}
                >
                  Clear
                </Button>
              )}
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0.5 }}>
              {ICONS.map((icon) => {
                const iconData = style === 'solid' ? icon.solid : icon.outlined;
                return (
                  <Tooltip title={icon.name} key={icon.name}>
                    <ToggleButton
                      value={icon.name}
                      selected={value === icon.name}
                      size="small"
                      onClick={() => {
                        onChange(icon.name);
                        setAnchorEl(null);
                      }}
                    >
                      <iconData.Component fontSize="small" />
                    </ToggleButton>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
