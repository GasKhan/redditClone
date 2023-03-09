import communityStateData from '@/atoms/communityAtom';
import directoryMenuState, {
  defaultDirectoryMenuItem,
  directoryMenuItem,
} from '@/atoms/directoryMenuAtom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import RedditIcon from '@mui/icons-material/Reddit';

export default function useDirectory() {
  const router = useRouter();
  const communityState = useRecoilValue(communityStateData);
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  const toggleOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const onSelectMenuItem = (menuItem: directoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    if (directoryState.isOpen) toggleOpen();

    router.push(menuItem.link);
  };

  useEffect(() => {
    const { currentCommunity } = communityState;

    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: currentCommunity.id,
          imageUrl: currentCommunity.imageUrl,
          Icon: RedditIcon,
          iconColor: '#0079d3',
          link: `/r/${currentCommunity.id}`,
        },
      }));
    }
  }, [communityState.currentCommunity]);

  return { directoryState, setDirectoryState, toggleOpen, onSelectMenuItem };
}
