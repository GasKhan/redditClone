import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';
import CreateCommunityModal from '@/components/modals/CreateCommunityModal';
import RedditIcon from '@mui/icons-material/Reddit';
import MenuListItem from './MenuListItem';
import useCommunityData from '@/hooks/useCommunityData';
import useDirectory from '@/hooks/useDirectory';

const Directory: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    directoryState: { isOpen, selectedMenuItem },
    toggleOpen,
  } = useDirectory();
  const { communityData } = useCommunityData();
  const moderatingSnippets = communityData.communitySnippets.filter(
    (community) => community.isModerator === true
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    toggleOpen();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    toggleOpen();
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
          {selectedMenuItem.imageUrl ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="25px"
              width="25px"
            >
              <img src={selectedMenuItem.imageUrl} width="100%" height="100%" />
            </Box>
          ) : (
            <selectedMenuItem.Icon
              sx={{ width: 32, height: 32, color: selectedMenuItem.iconColor }}
            />
          )}
          <Typography
            display={{ xs: 'none', md: 'flex' }}
            mr={{ xs: ' 15px', lg: 'auto' }}
            ml="10px"
            fontSize="12px"
            fontWeight="700"
            color={selectedMenuItem.iconColor}
          >
            {selectedMenuItem.displayText}
          </Typography>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        // onClick={toggleOpen}
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
        {!!moderatingSnippets.length && (
          <MenuItem>
            <Typography fontSize="12px">MODERATING</Typography>
          </MenuItem>
        )}

        {moderatingSnippets.map((snippet) => {
          return (
            <MenuItem key={snippet.id}>
              <MenuListItem
                key={snippet.id}
                displayText={snippet.id}
                Icon={RedditIcon}
                iconColor="#ff4300"
                link={`/r/${snippet.id}`}
                imageUrl={snippet.imageUrl}
              />
            </MenuItem>
          );
        })}

        <MenuItem>
          <Typography fontSize="12px">MY COMMUNITIES</Typography>
        </MenuItem>
        <MenuItem>
          <AddIcon />
          <CreateCommunityModal />
        </MenuItem>
        {communityData.communitySnippets.map((snippet) => {
          return (
            <MenuItem key={snippet.id}>
              <MenuListItem
                key={snippet.id}
                displayText={snippet.id}
                Icon={RedditIcon}
                iconColor="#0079d3"
                link={`/r/${snippet.id}`}
                imageUrl={snippet.imageUrl}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};

export default Directory;
