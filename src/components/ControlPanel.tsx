import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { HexColorPicker } from 'react-colorful';

import { useButtonConfigStore } from '../store/useButtonConfigStore';
import { IconPicker } from './IconPicker';
import type { ThemeColorName } from '../types/buttonConfig';

const THEME_COLORS: ThemeColorName[] = ['primary', 'secondary', 'success', 'error', 'info', 'warning'];

function Section({ title, defaultExpanded = true, children }: { title: string; defaultExpanded?: boolean; children: React.ReactNode }) {
  return (
    <Accordion defaultExpanded={defaultExpanded} disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>{children}</Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export function ControlPanel() {
  const config = useButtonConfigStore((s) => s.config);
  const set = useButtonConfigStore((s) => s.set);
  const reset = useButtonConfigStore((s) => s.reset);

  return (
    <Box sx={{ height: '100%', overflowY: 'auto' }}>
      <Stack direction="row" sx={{ px: 2, py: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Controls</Typography>
        <Button size="small" startIcon={<RestartAltIcon />} onClick={reset}>
          Reset
        </Button>
      </Stack>

      <Section title="Content">
        <TextField
          label="Label"
          size="small"
          value={config.label}
          onChange={(e) => set('label', e.target.value)}
          disabled={config.iconOnly}
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch
              checked={config.iconOnly}
              onChange={(e) => set('iconOnly', e.target.checked)}
            />
          }
          label="Icon-only (IconButton)"
        />
        <Stack direction="row" spacing={2}>
          <IconPicker label="Start icon" value={config.startIcon} onChange={(v) => set('startIcon', v)} />
          {!config.iconOnly && (
            <IconPicker label="End icon" value={config.endIcon} onChange={(v) => set('endIcon', v)} />
          )}
        </Stack>
      </Section>

      <Section title="Variant & Color">
        <ToggleButtonGroup
          value={config.variant}
          exclusive
          size="small"
          onChange={(_, v) => v && set('variant', v)}
          fullWidth
        >
          <ToggleButton value="text">Text</ToggleButton>
          <ToggleButton value="outlined">Outlined</ToggleButton>
          <ToggleButton value="contained">Contained</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={config.colorMode}
          exclusive
          size="small"
          onChange={(_, v) => v && set('colorMode', v)}
          fullWidth
        >
          <ToggleButton value="theme">Theme color</ToggleButton>
          <ToggleButton value="custom">Custom hex</ToggleButton>
        </ToggleButtonGroup>

        {config.colorMode === 'theme' ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {THEME_COLORS.map((c) => (
              <Button
                key={c}
                size="small"
                variant={config.color === c ? 'contained' : 'outlined'}
                color={c}
                onClick={() => set('color', c)}
                sx={{ textTransform: 'capitalize', minWidth: 88 }}
              >
                {c}
              </Button>
            ))}
          </Box>
        ) : (
          <Box>
            <HexColorPicker
              color={config.customColor}
              onChange={(hex) => set('customColor', hex)}
              style={{ width: '100%' }}
            />
            <TextField
              size="small"
              value={config.customColor}
              onChange={(e) => set('customColor', e.target.value)}
              sx={{ mt: 1 }}
              fullWidth
            />
          </Box>
        )}

        <FormControlLabel
          control={<Switch checked={config.disabled} onChange={(e) => set('disabled', e.target.checked)} />}
          label="Disabled"
        />
        <FormControlLabel
          control={<Switch checked={config.loading} onChange={(e) => set('loading', e.target.checked)} />}
          label="Loading"
        />
      </Section>

      <Section title="Size & Spacing" defaultExpanded={false}>
        <ToggleButtonGroup
          value={config.size}
          exclusive
          size="small"
          onChange={(_, v) => v && set('size', v)}
          fullWidth
        >
          <ToggleButton value="small">Small</ToggleButton>
          <ToggleButton value="medium">Medium</ToggleButton>
          <ToggleButton value="large">Large</ToggleButton>
        </ToggleButtonGroup>

        <FormControlLabel
          control={<Switch checked={config.fullWidth} onChange={(e) => set('fullWidth', e.target.checked)} />}
          label="Full width"
        />

        <Box>
          <Typography variant="caption" color="text.secondary">
            Min width: {config.minWidth ?? 'auto'}
          </Typography>
          <Slider
            value={config.minWidth ?? 0}
            min={0}
            max={400}
            step={8}
            onChange={(_, v) => set('minWidth', (v as number) === 0 ? null : (v as number))}
          />
        </Box>
      </Section>

      <Section title="Shape" defaultExpanded={false}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Border radius: {config.borderRadius}px
          </Typography>
          <Slider
            value={config.borderRadius}
            min={0}
            max={32}
            step={1}
            onChange={(_, v) => set('borderRadius', v as number)}
          />
        </Box>
      </Section>

      <Section title="Elevation & Effects" defaultExpanded={false}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Elevation: {config.elevation}
          </Typography>
          <Slider
            value={config.elevation}
            min={0}
            max={24}
            step={1}
            onChange={(_, v) => set('elevation', v as number)}
          />
        </Box>
        <FormControlLabel
          control={
            <Switch checked={config.disableRipple} onChange={(e) => set('disableRipple', e.target.checked)} />
          }
          label="Disable ripple"
        />
      </Section>

      <Section title="Accessibility" defaultExpanded={false}>
        <TextField
          label="aria-label"
          size="small"
          value={config.ariaLabel}
          onChange={(e) => set('ariaLabel', e.target.value)}
          error={config.iconOnly && !config.ariaLabel}
          helperText={config.iconOnly && !config.ariaLabel ? 'Required for icon-only buttons' : ' '}
          fullWidth
        />
      </Section>
    </Box>
  );
}
