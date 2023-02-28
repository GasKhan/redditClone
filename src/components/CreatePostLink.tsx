import { Box, Input, TextField } from '@mui/material';
import React from 'react';
import RedditIcon from '@mui/icons-material/Reddit';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import LinkIcon from '@mui/icons-material/Link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { AuthModalState } from '@/atoms/authModalAtom';

const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const user = useAuthState(auth);
  const setLoginModal = useSetRecoilState(AuthModalState);

  const handleLinkClick = (e: React.MouseEvent) => {
    if (!user) {
      setLoginModal({
        isOpen: false,
        view: 'logIn',
      });
    }
    const { communityId } = router.query;
    router.push(`/r/${communityId}/submit`);
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexGrow="1"
      alignItems="center"
      p="10px"
      mb="20px"
      borderRadius="2px"
      bgcolor="#fff"
      border="1px solid #9e9e9e"
    >
      <RedditIcon
        sx={{
          width: 35,
          height: 35,
          bgcolor: '#9e9e9e',
          fill: '#fff',
          borderRadius: '50%',
        }}
      />
      <TextField
        color="secondary"
        placeholder="Create Post"
        onClick={handleLinkClick}
        sx={{
          width: 35,
          height: 35,
          flexGrow: 1,
          mx: '15px',
          bgcolor: (theme) => theme.palette.grey[50],
          borderRadius: '3px',
          '& input': {
            p: '5px',
          },
        }}
        variant="outlined"
      />
      <WallpaperIcon
        sx={{
          width: 35,
          height: 35,
          color: (theme) => theme.palette.grey[500],
          mr: '12px',
        }}
      />
      <LinkIcon sx={{ color: (theme) => theme.palette.grey[500] }} />
    </Box>
  );
};
export default CreatePostLink;
