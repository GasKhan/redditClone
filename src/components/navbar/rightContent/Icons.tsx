import Box from '@mui/material/Box';
import React from 'react';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

type IconsProps = {};
const boxStyles = {
  border: '2px solid #000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  mx: '10px',
  height: '30px',
  width: '30px',
  cursor: 'pointer',
};
const Icons: React.FC<IconsProps> = () => {
  return (
    <>
      <Box
        display={{ xs: 'none', md: 'flex' }}
        sx={{ borderRight: '1px solid #616161' }}
      >
        <Box sx={boxStyles}>
          <ArrowOutwardOutlinedIcon />
        </Box>
        <Box sx={boxStyles}>
          <FilterListOutlinedIcon />
        </Box>
        <Box>
          <VideocamIcon sx={{ ...boxStyles, border: 'none' }} />
        </Box>
      </Box>
      <>
        <Box>
          <TextsmsOutlinedIcon sx={{ ...boxStyles, border: 'none' }} />
        </Box>
        <Box>
          <NotificationsNoneIcon sx={{ ...boxStyles, border: 'none' }} />
        </Box>
        <Box display={{ xs: 'none', sm: 'flex' }}>
          <AddIcon sx={{ ...boxStyles, border: 'none' }} />
        </Box>
      </>
    </>
  );
};
export default Icons;
