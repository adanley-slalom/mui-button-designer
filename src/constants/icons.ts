import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

// Solid icons
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
import Bell from '@mui/icons-material/Notifications';
import Calendar from '@mui/icons-material/DateRange';
import Clock from '@mui/icons-material/Schedule';
import Copy from '@mui/icons-material/ContentCopy';
import Filter from '@mui/icons-material/FilterList';
import MapPin from '@mui/icons-material/LocationOn';
import Phone from '@mui/icons-material/Phone';
import Refresh from '@mui/icons-material/Refresh';
import Block from '@mui/icons-material/Block';

// Outlined icons
import AddOutlined from '@mui/icons-material/AddOutlined';
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorder';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import MailOutlined from '@mui/icons-material/MailOutlined';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import StarBorderOutlined from '@mui/icons-material/StarBorder';
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import DateRangeOutlined from '@mui/icons-material/DateRangeOutlined';
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import FilterListOutlined from '@mui/icons-material/FilterListOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import RefreshOutlined from '@mui/icons-material/RefreshOutlined';
import BlockOutlined from '@mui/icons-material/BlockOutlined';

export type IconStyle = 'solid' | 'outlined';

export interface IconEntry {
  name: string;
  solid: { importPath: string; Component: ComponentType<SvgIconProps> };
  outlined: { importPath: string; Component: ComponentType<SvgIconProps> };
}

export const ICONS: IconEntry[] = [
  {
    name: 'Add',
    solid: { importPath: '@mui/icons-material/Add', Component: Add },
    outlined: { importPath: '@mui/icons-material/AddOutlined', Component: AddOutlined },
  },
  {
    name: 'ArrowBack',
    solid: { importPath: '@mui/icons-material/ArrowBack', Component: ArrowBack },
    outlined: { importPath: '@mui/icons-material/ArrowBackOutlined', Component: ArrowBackOutlined },
  },
  {
    name: 'ArrowForward',
    solid: { importPath: '@mui/icons-material/ArrowForward', Component: ArrowForward },
    outlined: { importPath: '@mui/icons-material/ArrowForwardOutlined', Component: ArrowForwardOutlined },
  },
  {
    name: 'Block',
    solid: { importPath: '@mui/icons-material/Block', Component: Block },
    outlined: { importPath: '@mui/icons-material/BlockOutlined', Component: BlockOutlined },
  },
  {
    name: 'Bell',
    solid: { importPath: '@mui/icons-material/Notifications', Component: Bell },
    outlined: { importPath: '@mui/icons-material/NotificationsOutlined', Component: NotificationsOutlined },
  },
  {
    name: 'Calendar',
    solid: { importPath: '@mui/icons-material/DateRange', Component: Calendar },
    outlined: { importPath: '@mui/icons-material/DateRangeOutlined', Component: DateRangeOutlined },
  },
  {
    name: 'Check',
    solid: { importPath: '@mui/icons-material/Check', Component: Check },
    outlined: { importPath: '@mui/icons-material/CheckOutlined', Component: CheckOutlined },
  },
  {
    name: 'Clock',
    solid: { importPath: '@mui/icons-material/Schedule', Component: Clock },
    outlined: { importPath: '@mui/icons-material/ScheduleOutlined', Component: ScheduleOutlined },
  },
  {
    name: 'Close',
    solid: { importPath: '@mui/icons-material/Close', Component: Close },
    outlined: { importPath: '@mui/icons-material/CloseOutlined', Component: CloseOutlined },
  },
  {
    name: 'Copy',
    solid: { importPath: '@mui/icons-material/ContentCopy', Component: Copy },
    outlined: { importPath: '@mui/icons-material/ContentCopyOutlined', Component: ContentCopyOutlined },
  },
  {
    name: 'Delete',
    solid: { importPath: '@mui/icons-material/Delete', Component: Delete },
    outlined: { importPath: '@mui/icons-material/DeleteOutlined', Component: DeleteOutlined },
  },
  {
    name: 'Download',
    solid: { importPath: '@mui/icons-material/Download', Component: Download },
    outlined: { importPath: '@mui/icons-material/DownloadOutlined', Component: DownloadOutlined },
  },
  {
    name: 'Edit',
    solid: { importPath: '@mui/icons-material/Edit', Component: Edit },
    outlined: { importPath: '@mui/icons-material/EditOutlined', Component: EditOutlined },
  },
  {
    name: 'Favorite',
    solid: { importPath: '@mui/icons-material/Favorite', Component: Favorite },
    outlined: { importPath: '@mui/icons-material/FavoriteBorder', Component: FavoriteBorderOutlined },
  },
  {
    name: 'Filter',
    solid: { importPath: '@mui/icons-material/FilterList', Component: Filter },
    outlined: { importPath: '@mui/icons-material/FilterListOutlined', Component: FilterListOutlined },
  },
  {
    name: 'Home',
    solid: { importPath: '@mui/icons-material/Home', Component: Home },
    outlined: { importPath: '@mui/icons-material/HomeOutlined', Component: HomeOutlined },
  },
  {
    name: 'Info',
    solid: { importPath: '@mui/icons-material/Info', Component: Info },
    outlined: { importPath: '@mui/icons-material/InfoOutlined', Component: InfoOutlined },
  },
  {
    name: 'Location',
    solid: { importPath: '@mui/icons-material/LocationOn', Component: MapPin },
    outlined: { importPath: '@mui/icons-material/LocationOnOutlined', Component: LocationOnOutlined },
  },
  {
    name: 'Login',
    solid: { importPath: '@mui/icons-material/Login', Component: Login },
    outlined: { importPath: '@mui/icons-material/LoginOutlined', Component: LoginOutlined },
  },
  {
    name: 'Logout',
    solid: { importPath: '@mui/icons-material/Logout', Component: Logout },
    outlined: { importPath: '@mui/icons-material/LogoutOutlined', Component: LogoutOutlined },
  },
  {
    name: 'Mail',
    solid: { importPath: '@mui/icons-material/Mail', Component: Mail },
    outlined: { importPath: '@mui/icons-material/MailOutlined', Component: MailOutlined },
  },
  {
    name: 'Menu',
    solid: { importPath: '@mui/icons-material/Menu', Component: Menu },
    outlined: { importPath: '@mui/icons-material/MenuOutlined', Component: MenuOutlined },
  },
  {
    name: 'Phone',
    solid: { importPath: '@mui/icons-material/Phone', Component: Phone },
    outlined: { importPath: '@mui/icons-material/PhoneOutlined', Component: PhoneOutlined },
  },
  {
    name: 'Refresh',
    solid: { importPath: '@mui/icons-material/Refresh', Component: Refresh },
    outlined: { importPath: '@mui/icons-material/RefreshOutlined', Component: RefreshOutlined },
  },
  {
    name: 'Save',
    solid: { importPath: '@mui/icons-material/Save', Component: Save },
    outlined: { importPath: '@mui/icons-material/SaveOutlined', Component: SaveOutlined },
  },
  {
    name: 'Search',
    solid: { importPath: '@mui/icons-material/Search', Component: Search },
    outlined: { importPath: '@mui/icons-material/SearchOutlined', Component: SearchOutlined },
  },
  {
    name: 'Send',
    solid: { importPath: '@mui/icons-material/Send', Component: Send },
    outlined: { importPath: '@mui/icons-material/SendOutlined', Component: SendOutlined },
  },
  {
    name: 'Settings',
    solid: { importPath: '@mui/icons-material/Settings', Component: Settings },
    outlined: { importPath: '@mui/icons-material/SettingsOutlined', Component: SettingsOutlined },
  },
  {
    name: 'ShoppingCart',
    solid: { importPath: '@mui/icons-material/ShoppingCart', Component: ShoppingCart },
    outlined: { importPath: '@mui/icons-material/ShoppingCartOutlined', Component: ShoppingCartOutlined },
  },
  {
    name: 'Star',
    solid: { importPath: '@mui/icons-material/Star', Component: Star },
    outlined: { importPath: '@mui/icons-material/StarBorder', Component: StarBorderOutlined },
  },
  {
    name: 'ThumbUp',
    solid: { importPath: '@mui/icons-material/ThumbUp', Component: ThumbUp },
    outlined: { importPath: '@mui/icons-material/ThumbUpOutlined', Component: ThumbUpOutlined },
  },
  {
    name: 'Upload',
    solid: { importPath: '@mui/icons-material/Upload', Component: Upload },
    outlined: { importPath: '@mui/icons-material/UploadOutlined', Component: UploadOutlined },
  },
  {
    name: 'Visibility',
    solid: { importPath: '@mui/icons-material/Visibility', Component: Visibility },
    outlined: { importPath: '@mui/icons-material/VisibilityOutlined', Component: VisibilityOutlined },
  },
  {
    name: 'Share',
    solid: { importPath: '@mui/icons-material/Share', Component: Share },
    outlined: { importPath: '@mui/icons-material/ShareOutlined', Component: ShareOutlined },
  },
];

export function getIconByName(name: string | null, style: IconStyle = 'solid'): { importPath: string; Component: ComponentType<SvgIconProps> } | undefined {
  if (!name) return undefined;
  const icon = ICONS.find((i) => i.name === name);
  return icon ? icon[style] : undefined;
}
