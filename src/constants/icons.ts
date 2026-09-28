import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

import Add from '@mui/icons-material/Add';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import Upload from '@mui/icons-material/Upload';
import Favorite from '@mui/icons-material/Favorite';
import Home from '@mui/icons-material/Home';
import Info from '@mui/icons-material/Info';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import Mail from '@mui/icons-material/Mail';
import Menu from '@mui/icons-material/Menu';
import Save from '@mui/icons-material/Save';
import Search from '@mui/icons-material/Search';
import Send from '@mui/icons-material/Send';
import Settings from '@mui/icons-material/Settings';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Star from '@mui/icons-material/Star';
import ThumbUp from '@mui/icons-material/ThumbUp';
import Visibility from '@mui/icons-material/Visibility';
import Edit from '@mui/icons-material/Edit';
import Share from '@mui/icons-material/Share';

export interface IconEntry {
  name: string;
  importPath: string;
  Component: ComponentType<SvgIconProps>;
}

export const ICONS: IconEntry[] = [
  { name: 'Add', importPath: '@mui/icons-material/Add', Component: Add },
  { name: 'ArrowForward', importPath: '@mui/icons-material/ArrowForward', Component: ArrowForward },
  { name: 'ArrowBack', importPath: '@mui/icons-material/ArrowBack', Component: ArrowBack },
  { name: 'Check', importPath: '@mui/icons-material/Check', Component: Check },
  { name: 'Close', importPath: '@mui/icons-material/Close', Component: Close },
  { name: 'Delete', importPath: '@mui/icons-material/Delete', Component: Delete },
  { name: 'Download', importPath: '@mui/icons-material/Download', Component: Download },
  { name: 'Upload', importPath: '@mui/icons-material/Upload', Component: Upload },
  { name: 'Favorite', importPath: '@mui/icons-material/Favorite', Component: Favorite },
  { name: 'Home', importPath: '@mui/icons-material/Home', Component: Home },
  { name: 'Info', importPath: '@mui/icons-material/Info', Component: Info },
  { name: 'Login', importPath: '@mui/icons-material/Login', Component: Login },
  { name: 'Logout', importPath: '@mui/icons-material/Logout', Component: Logout },
  { name: 'Mail', importPath: '@mui/icons-material/Mail', Component: Mail },
  { name: 'Menu', importPath: '@mui/icons-material/Menu', Component: Menu },
  { name: 'Save', importPath: '@mui/icons-material/Save', Component: Save },
  { name: 'Search', importPath: '@mui/icons-material/Search', Component: Search },
  { name: 'Send', importPath: '@mui/icons-material/Send', Component: Send },
  { name: 'Settings', importPath: '@mui/icons-material/Settings', Component: Settings },
  { name: 'ShoppingCart', importPath: '@mui/icons-material/ShoppingCart', Component: ShoppingCart },
  { name: 'Star', importPath: '@mui/icons-material/Star', Component: Star },
  { name: 'ThumbUp', importPath: '@mui/icons-material/ThumbUp', Component: ThumbUp },
  { name: 'Visibility', importPath: '@mui/icons-material/Visibility', Component: Visibility },
  { name: 'Edit', importPath: '@mui/icons-material/Edit', Component: Edit },
  { name: 'Share', importPath: '@mui/icons-material/Share', Component: Share },
];

export function getIconByName(name: string | null): IconEntry | undefined {
  if (!name) return undefined;
  return ICONS.find((icon) => icon.name === name);
}
