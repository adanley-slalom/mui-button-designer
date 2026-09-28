import { useEffect, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

import { useButtonConfigStore } from '../store/useButtonConfigStore';
import { generateCode } from '../utils/generateCode';
import { formatCode } from '../utils/formatCode';

export function CodePanel() {
  const config = useButtonConfigStore((s) => s.config);
  const [language, setLanguage] = useState<'tsx' | 'jsx'>('tsx');
  const [includeImports, setIncludeImports] = useState(true);
  const [includeWrapper, setIncludeWrapper] = useState(true);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const raw = generateCode(config, { language, includeImports, includeWrapper });
    formatCode(raw, language).then((formatted) => {
      if (!cancelled) setCode(formatted);
    });
    return () => {
      cancelled = true;
    };
  }, [config, language, includeImports, includeWrapper]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack
        direction="row"
        sx={{ px: 2, py: 1.5, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 1 }}
      >
        <Typography variant="h6">Code</Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <ToggleButtonGroup value={language} exclusive size="small" onChange={(_, v) => v && setLanguage(v)} sx={{ px: '0.75rem' }}>
            <ToggleButton value="tsx">TS</ToggleButton>
            <ToggleButton value="jsx">JS</ToggleButton>
          </ToggleButtonGroup>
          <FormControlLabel
            control={<Switch size="small" checked={includeImports} onChange={(e) => setIncludeImports(e.target.checked)} />}
            label="Imports"
          />
          <FormControlLabel
            control={<Switch size="small" checked={includeWrapper} onChange={(e) => setIncludeWrapper(e.target.checked)} />}
            label="Wrapper"
          />
          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
            <IconButton size="small" onClick={handleCopy}>
              {copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 2 }}>
        <Highlight code={code} language={language === 'tsx' ? 'tsx' : 'jsx'} theme={themes.nightOwl}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <Box
              component="pre"
              sx={{
                ...style,
                m: 0,
                p: 2,
                borderRadius: 2,
                fontSize: 13,
                overflow: 'auto',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </Box>
          )}
        </Highlight>
      </Box>
    </Box>
  );
}
