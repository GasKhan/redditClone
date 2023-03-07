import React from 'react';
import Box from '@mui/material/Box';
import SearchInput from './SearchInput';
import RightContent from './rightContent/RightContent';
import Directory from './directory/Directory';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import useDirectory from '@/hooks/useDirectory';
import { defaultDirectoryMenuItem } from '@/atoms/directoryMenuAtom';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: '6px 12px',
        bgcolor: '#fff',
      }}
    >
      <Box
        display="flex"
        onClick={() => onSelectMenuItem(defaultDirectoryMenuItem)}
        sx={{
          height: 40,
          mr: '10px',
          cursor: 'pointer',
        }}
      >
        <Box
          component="img"
          src="/images/redditFace.svg"
          width="100%"
          height="100%"
        />
        <Box
          component="img"
          src="/images/redditText.svg"
          display={{
            xs: 'none',
            sm: 'flex',
            cursor: 'pointer',
          }}
          width="100%"
          height="100%"
        />
      </Box>
      {/* <Box
        onClick={() => onSelectMenuItem(defaultDirectoryMenuItem)}
        sx={{
          width: 46,
          display: {
            xs: 'none',
            sm: 'flex',
            cursor: 'pointer',
          },
        }}
      ></Box> */}

      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Box>
  );
};
export default Navbar;
