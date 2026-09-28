import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import BlockIcon from '@mui/icons-material/Block';
import { ICONS, getIconByName } from '../constants/icons';

interface IconPickerProps {
  label: string;
  value: string | null;
  onChange: (name: string | null) => void;
}

export function IconPicker({ label, value, onChange }: IconPickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const selected = getIconByName(value);

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
        startIcon={selected ? <selected.Component fontSize="small" /> : <BlockIcon fontSize="small" />}
      >
        {selected ? selected.name : 'None'}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0.5, p: 1, maxWidth: 260 }}>
          <Tooltip title="None">
            <ToggleButton
              value="none"
              selected={!value}
              size="small"
              onClick={() => {
                onChange(null);
                setAnchorEl(null);
              }}
            >
              <BlockIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          {ICONS.map((icon) => (
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
                <icon.Component fontSize="small" />
              </ToggleButton>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  );
}
