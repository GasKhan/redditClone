import React from 'react';
import Box from '@mui/material/Box';
import SearchInput from './SearchInput';
import RightContent from './rightContent/RightContent';
import Directory from './directory/Directory';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: '6px 12px',
        bgcolor: '#fff',
      }}
    >
      <Box
        component="img"
        src="/images/redditFace.svg"
        sx={{
          height: 30,
          mr: '10px',
        }}
      />
      <Box
        component="img"
        src="/images/redditText.svg"
        sx={{
          width: 46,
          display: {
            xs: 'none',
            sm: 'flex',
          },
        }}
      />

      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Box>
  );
};
export default Navbar;
