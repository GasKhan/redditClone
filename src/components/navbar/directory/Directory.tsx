import * as React from 'react';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';

type DirectoryProps = {};

const Directory: React.FC<DirectoryProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          width: {
            xs: 'auto',
            lg: '200px',
          },
          mr: '10px',
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: { xs: 0, sm: 2 },
            borderRadius: '10px',
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'space-between' },
            width: '100%',
          }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <HomeIcon sx={{ width: 32, height: 32, color: '#000' }} />
          <Typography
            display={{ xs: 'none', md: 'flex' }}
            mr={{ xs: ' 15px', lg: 'auto' }}
            ml="10px"
            fontSize="12px"
            fontWeight="700"
            color="#000"
          >
            Home
          </Typography>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Home
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> Another
        </MenuItem>
        <Divider />
      </Menu>
    </React.Fragment>
  );
};

export default Directory;
