import type { ButtonConfig } from '../types/buttonConfig';
import { getIconByName } from '../constants/icons';

export interface CodeGenOptions {
  language: 'tsx' | 'jsx';
  includeImports: boolean;
  includeWrapper: boolean;
}

function hexAlphaSuffix(alpha: number): string {
  // alpha 0-1 -> two-digit hex suffix
  return Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');
}

function buildSxEntries(config: ButtonConfig): string[] {
  const entries: string[] = [];
  const { colorMode, customColor, variant, borderRadius, elevation, minWidth } = config;

  if (colorMode === 'custom') {
    if (variant === 'contained') {
      entries.push(`backgroundColor: '${customColor}'`);
      entries.push(`color: '#fff'`);
      entries.push(
        `'&:hover': { backgroundColor: '${customColor}', filter: 'brightness(0.92)' }`,
      );
    } else if (variant === 'outlined') {
      entries.push(`color: '${customColor}'`);
      entries.push(`borderColor: '${customColor}'`);
      entries.push(
        `'&:hover': { borderColor: '${customColor}', backgroundColor: '${customColor}${hexAlphaSuffix(0.08)}' }`,
      );
    } else {
      entries.push(`color: '${customColor}'`);
      entries.push(
        `'&:hover': { backgroundColor: '${customColor}${hexAlphaSuffix(0.08)}' }`,
      );
    }
  }

  if (borderRadius !== 4) {
    entries.push(`borderRadius: ${borderRadius}`);
  }

  if (elevation !== 2) {
    entries.push(`boxShadow: (theme) => theme.shadows[${elevation}]`);
  }

  if (minWidth != null) {
    entries.push(`minWidth: ${minWidth}`);
  }

  return entries;
}

function buildProps(config: ButtonConfig, startIcon: ReturnType<typeof getIconByName> | undefined, endIcon: ReturnType<typeof getIconByName> | undefined, sxEntries: string[]): string[] {
  const props: string[] = [];
  const { variant, colorMode, color, size, disabled, loading, loadingShowText, loadingPosition, fullWidth, disableRipple, ariaLabel } =
    config;

  // IconButton has no `variant`/`fullWidth` props; only Button supports them.
  if (!config.iconOnly) {
    props.push(`variant="${variant}"`);
  }

  if (colorMode === 'theme' && color !== 'primary') {
    props.push(`color="${color}"`);
  }

  if (size !== 'medium') {
    props.push(`size="${size}"`);
  }

  if (!config.iconOnly && fullWidth) props.push('fullWidth');
  if (disabled) props.push('disabled');
  if (loading) props.push('loading');
  if (disableRipple) props.push('disableRipple');

  const spinnerSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  if (!config.iconOnly && loading && loadingShowText && loadingPosition === 'start') {
    props.push(`startIcon={<CircularProgress size={${spinnerSize}} sx={{ color: 'inherit' }} />}`);
  } else if (!config.iconOnly && startIcon) {
    const iconName = startIcon.importPath.split('/').pop() || 'Icon';
    props.push(`startIcon={<${iconName} />}`);
  }

  if (!config.iconOnly && loading && loadingShowText && loadingPosition === 'end') {
    props.push(`endIcon={<CircularProgress size={${spinnerSize}} sx={{ color: 'inherit' }} />}`);
  } else if (!config.iconOnly && endIcon) {
    const iconName = endIcon.importPath.split('/').pop() || 'Icon';
    props.push(`endIcon={<${iconName} />}`);
  }

  if (ariaLabel) {
    props.push(`aria-label="${ariaLabel}"`);
  }

  if (sxEntries.length > 0) {
    props.push(`sx={{ ${sxEntries.join(', ')} }}`);
  }

  return props;
}

function indentLines(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n');
}

export function generateCode(config: ButtonConfig, options: CodeGenOptions): string {
  const { language, includeImports, includeWrapper } = options;
  const sxEntries = buildSxEntries(config);
  
  const startIcon = getIconByName(config.startIcon, config.iconStyle);
  const endIcon = getIconByName(config.endIcon, config.iconStyle);
  
  const props = buildProps(config, startIcon, endIcon, sxEntries);

  const iconForIconOnly = startIcon ?? endIcon;

  const usedIcons = config.iconOnly
    ? iconForIconOnly
      ? [iconForIconOnly]
      : []
    : [startIcon, endIcon].filter((icon): icon is NonNullable<typeof icon> => Boolean(icon));

  let elementJsx: string;

  if (config.iconOnly) {
    const iconOnlyProps = props.filter((p) => !p.startsWith('startIcon') && !p.startsWith('endIcon'));
    const iconName = iconForIconOnly ? iconForIconOnly.importPath.split('/').pop() || 'Icon' : null;
    let iconChild: string;
    if (config.loading) {
      const spinnerSize = config.size === 'small' ? 16 : config.size === 'large' ? 24 : 20;
      iconChild = `<CircularProgress size={${spinnerSize}} sx={{ color: 'inherit' }} />`;
    } else {
      iconChild = iconName ? `<${iconName} />` : '{/* choose an icon */}';
    }
    elementJsx =
      iconOnlyProps.length > 0
        ? `<IconButton\n${indentLines(iconOnlyProps.join('\n'), 2)}\n>\n  ${iconChild}\n</IconButton>`
        : `<IconButton>\n  ${iconChild}\n</IconButton>`;
  } else {
    const spinnerSize = config.size === 'small' ? 16 : config.size === 'large' ? 24 : 20;
    let buttonContent: string;

    if (config.loading && !config.loadingShowText) {
      buttonContent = `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>\n    <CircularProgress size={${spinnerSize}} sx={{ color: 'inherit' }} />\n  </Box>`;
    } else {
      buttonContent = config.label;
    }

    elementJsx =
      props.length > 0
        ? `<Button\n${indentLines(props.join('\n'), 2)}\n>\n  ${buttonContent}\n</Button>`
        : `<Button>${buttonContent}</Button>`;
  }

  const importLines: string[] = [];
  if (includeImports) {
    if (config.iconOnly) {
      importLines.push(`import IconButton from '@mui/material/IconButton';`);
    } else {
      importLines.push(`import Button from '@mui/material/Button';`);
    }

    if (config.loading && !config.loadingShowText) {
      importLines.push(`import CircularProgress from '@mui/material/CircularProgress';`);
      if (!config.iconOnly) {
        importLines.push(`import Box from '@mui/material/Box';`);
      }
    } else if (config.loading && config.loadingShowText && !config.iconOnly) {
      importLines.push(`import CircularProgress from '@mui/material/CircularProgress';`);
    }

    for (const icon of usedIcons) {
      const iconName = icon.importPath.split('/').pop() || 'Icon';
      importLines.push(`import ${iconName} from '${icon.importPath}';`);
    }
  }

  if (!includeWrapper) {
    return importLines.length > 0 ? [...importLines, '', elementJsx].join('\n') : elementJsx;
  }

  const componentName = 'DesignedButton';
  const returnType = language === 'tsx' ? ': React.JSX.Element' : '';
  const bodyLines = [
    ...importLines,
    '',
    `export default function ${componentName}()${returnType} {`,
    `  return (`,
    indentLines(elementJsx, 4),
    `  );`,
    `}`,
  ];

  return bodyLines.join('\n');
}
