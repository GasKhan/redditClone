import HomeIcon from '@mui/icons-material/Home';
import { atom } from 'recoil';

export type directoryMenuItem = {
  displayText: string;
  Icon: React.ElementType;
  iconColor: string;
  link: string;
  imageUrl?: string;
};

interface IDirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: directoryMenuItem;
}

export const defaultDirectoryMenuItem: directoryMenuItem = {
  displayText: 'Home',
  Icon: HomeIcon,
  iconColor: '#000',
  link: '/',
};
const defaultDirectoryMenuState: IDirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultDirectoryMenuItem,
};
const directoryMenuState = atom({
  key: 'directoryMenuState',
  default: defaultDirectoryMenuState,
});

export default directoryMenuState;
