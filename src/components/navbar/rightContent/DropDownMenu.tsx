import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import RedditIcon from '@mui/icons-material/Reddit';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginIcon from '@mui/icons-material/Login';
import { User } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { AuthModalState } from '@/atoms/authModalAtom';
import { MenuList, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface DropDownMenuProps {
  user?: User | null;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [signOut, loading, signOutError] = useSignOut(auth);
  const setAuthModal = useSetRecoilState(AuthModalState);

  const showAuthModal = () => {
    setAuthModal((prev) => ({ isOpen: true, view: 'logIn' }));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, borderRadius: '10px' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user ? (
              <Box display="flex" alignItems="center">
                <RedditIcon sx={{ width: 32, height: 32 }} />
                <Box
                  display={{ xs: 'none', md: 'flex' }}
                  flexDirection="column"
                  sx={{ mx: '15px' }}
                >
                  <Typography
                    fontWeight="700"
                    fontSize="14px"
                    color="#000"
                    overflow="hidden"
                  >
                    {user?.displayName || user.email?.split('@')[0]}
                  </Typography>
                  <Box display="flex">
                    <AutoAwesomeIcon
                      sx={{ color: '#d50000', height: '15px', width: '10px' }}
                    />
                    <Typography fontSize="12px">1 karma</Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <AccountCircleOutlinedIcon sx={{ width: 32, height: 32 }} />
            )}
            <KeyboardArrowDownIcon />
          </IconButton>
        </Tooltip>
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
        {user ? (
          <MenuList>
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                signOut();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList>
            <MenuItem
              onClick={() => {
                showAuthModal();
              }}
            >
              <LoginIcon /> Log In / Sign Out
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </>
  );
};
export default DropDownMenu;
