import React from 'react';
import Box from '@mui/material/Box';
import SearchInput from './SearchInput';
import RightContent from './rightContent/RightContent';

const Navbar: React.FC = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        p: '6px 12px',
        bgcolor: '#fff',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        src="./images/redditFace.svg"
        sx={{
          height: 30,
        }}
      />
      <Box
        component="img"
        src="./images/redditText.svg"
        sx={{
          width: 46,
          display: {
            xs: 'none',
            sm: 'flex',
          },
        }}
      />
      <SearchInput />
      <RightContent />
    </Box>
  );
};
export default Navbar;
