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

function buildProps(config: ButtonConfig, sxEntries: string[]): string[] {
  const props: string[] = [];
  const { variant, colorMode, color, size, disabled, loading, fullWidth, disableRipple, ariaLabel } =
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

  const startIcon = getIconByName(config.startIcon);
  const endIcon = getIconByName(config.endIcon);
  if (!config.iconOnly && startIcon) {
    props.push(`startIcon={<${startIcon.name}Icon />}`);
  }
  if (!config.iconOnly && endIcon) {
    props.push(`endIcon={<${endIcon.name}Icon />}`);
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
  const props = buildProps(config, sxEntries);

  const startIcon = getIconByName(config.startIcon);
  const endIcon = getIconByName(config.endIcon);
  const iconForIconOnly = startIcon ?? endIcon;

  const usedIcons = config.iconOnly
    ? iconForIconOnly
      ? [iconForIconOnly]
      : []
    : [startIcon, endIcon].filter((icon): icon is NonNullable<typeof icon> => Boolean(icon));

  let elementJsx: string;
  if (config.iconOnly) {
    const iconOnlyProps = props.filter((p) => !p.startsWith('startIcon') && !p.startsWith('endIcon'));
    const iconChild = iconForIconOnly ? `<${iconForIconOnly.name}Icon />` : '{/* choose an icon */}';
    elementJsx =
      iconOnlyProps.length > 0
        ? `<IconButton\n${indentLines(iconOnlyProps.join('\n'), 2)}\n>\n  ${iconChild}\n</IconButton>`
        : `<IconButton>\n  ${iconChild}\n</IconButton>`;
  } else {
    elementJsx =
      props.length > 0
        ? `<Button\n${indentLines(props.join('\n'), 2)}\n>\n  ${config.label}\n</Button>`
        : `<Button>${config.label}</Button>`;
  }

  const importLines: string[] = [];
  if (includeImports) {
    if (config.iconOnly) {
      importLines.push(`import IconButton from '@mui/material/IconButton';`);
    } else {
      importLines.push(`import Button from '@mui/material/Button';`);
    }
    for (const icon of usedIcons) {
      importLines.push(`import ${icon.name}Icon from '${icon.importPath}';`);
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
