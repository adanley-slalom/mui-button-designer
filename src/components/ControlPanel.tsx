import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { HexColorPicker } from 'react-colorful';

import { useButtonConfigStore } from '../store/useButtonConfigStore';
import { IconPicker } from './IconPicker';
import type { ThemeColorName, GoogleFont } from '../types/buttonConfig';
import { fontWeightsByFamily } from '../constants/fontWeights';

const THEME_COLORS: ThemeColorName[] = ['primary', 'secondary', 'success', 'error', 'info', 'warning'];
const GOOGLE_FONTS: GoogleFont[] = ['Figtree', 'Inter', 'Lexend', 'Montserrat', 'Open Sans', 'Poppins', 'Raleway', 'Roboto', 'Work Sans'];

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
    <Box sx={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
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
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1, color: '#6366f1' }}>
          Controls
        </Typography>
        <Button
          size="small"
          variant="text"
          startIcon={<RestartAltIcon />}
          onClick={reset}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Reset
        </Button>
      </Stack>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
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
        <Stack direction="column" spacing={2}>
          <IconPicker
            label="Start icon"
            value={config.startIcon}
            style={config.iconStyle}
            onStyleChange={(style) => set('iconStyle', style)}
            onChange={(v) => set('startIcon', v)}
          />
          {!config.iconOnly && (
            <IconPicker
              label="End icon"
              value={config.endIcon}
              style={config.iconStyle}
              onStyleChange={(style) => set('iconStyle', style)}
              onChange={(v) => set('endIcon', v)}
            />
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
        {config.loading && (
          <Stack spacing={1.5} sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={config.loadingShowText}
                  onChange={(e) => set('loadingShowText', e.target.checked)}
                />
              }
              label="Show text while loading"
            />
            {config.loadingShowText && (
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Loading icon position
                </Typography>
                <ToggleButtonGroup
                  value={config.loadingPosition}
                  exclusive
                  size="small"
                  onChange={(_, v) => v && set('loadingPosition', v)}
                  fullWidth
                >
                  <ToggleButton value="start">Start</ToggleButton>
                  <ToggleButton value="end">End</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}
          </Stack>
        )}
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

        <Stack direction="row" sx={{ alignItems: 'center', gap: 2, pr: 5 }}>
          <TextField
            select
            size="small"
            value={config.minWidth ?? 0}
            onChange={(e) => set('minWidth', (Number(e.target.value)) === 0 ? null : Number(e.target.value))}
            sx={{ width: 90, bgcolor: '#f3f4f6', '& .MuiOutlinedInput-root': { bgcolor: '#f3f4f6' }, '& .MuiOutlinedInput-input': { textAlign: 'center' } }}
          >
            <MenuItem value={0}>auto</MenuItem>
            {Array.from({ length: 51 }, (_, i) => i * 8).filter(v => v > 0).map((v) => (
              <MenuItem key={v} value={v}>
                {v}px
              </MenuItem>
            ))}
          </TextField>
          <Slider
            value={config.minWidth ?? 0}
            min={0}
            max={400}
            step={8}
            onChange={(_, v) => set('minWidth', (v as number) === 0 ? null : (v as number))}
            sx={{ flex: 1 }}
          />
        </Stack>
      </Section>

        <Section title="Shape" defaultExpanded={false}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 2, pr: 5 }}>
          <TextField
            select
            size="small"
            value={config.borderRadius}
            onChange={(e) => set('borderRadius', Number(e.target.value))}
            sx={{ width: 90, bgcolor: '#f3f4f6', '& .MuiOutlinedInput-root': { bgcolor: '#f3f4f6' }, '& .MuiOutlinedInput-input': { textAlign: 'center' } }}
          >
            {Array.from({ length: 33 }, (_, i) => i).map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
          <Slider
            value={config.borderRadius}
            min={0}
            max={32}
            step={1}
            onChange={(_, v) => set('borderRadius', v as number)}
            sx={{ flex: 1 }}
          />
        </Stack>
      </Section>

        <Section title="Elevation & Effects" defaultExpanded={false}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 2, pr: 5 }}>
          <TextField
            select
            size="small"
            value={config.elevation}
            onChange={(e) => set('elevation', Number(e.target.value))}
            sx={{ width: 90, bgcolor: '#f3f4f6', '& .MuiOutlinedInput-root': { bgcolor: '#f3f4f6' }, '& .MuiOutlinedInput-input': { textAlign: 'center' } }}
          >
            {Array.from({ length: 25 }, (_, i) => i).map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
          <Slider
            value={config.elevation}
            min={0}
            max={24}
            step={1}
            onChange={(_, v) => set('elevation', v as number)}
            sx={{ flex: 1 }}
          />
        </Stack>
        <FormControlLabel
          control={
            <Switch checked={config.disableRipple} onChange={(e) => set('disableRipple', e.target.checked)} />
          }
          label="Disable ripple"
        />
      </Section>

      <Section title="Typography" defaultExpanded={false}>
        <FormControl fullWidth size="small">
          <InputLabel>Font Family</InputLabel>
          <Select
            value={config.fontFamily}
            label="Font Family"
            onChange={(e) => set('fontFamily', e.target.value as GoogleFont)}
          >
            {GOOGLE_FONTS.map((font) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Font Weight</InputLabel>
          <Select
            value={config.fontWeight}
            label="Font Weight"
            onChange={(e) => set('fontWeight', e.target.value as number)}
          >
            {fontWeightsByFamily[config.fontFamily].map((weight) => (
              <MenuItem key={weight} value={weight}>
                {weight}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={config.textTransformUppercase}
              onChange={(e) => set('textTransformUppercase', e.target.checked)}
            />
          }
          label="Uppercase"
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
    </Box>
  );
}
