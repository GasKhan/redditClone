import { directoryMenuItem } from '@/atoms/directoryMenuAtom';
import useDirectory from '@/hooks/useDirectory';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const MenuListItem: React.FC<directoryMenuItem> = ({
  displayText,
  Icon,
  iconColor,
  link,
  imageUrl,
}) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      onClick={() =>
        onSelectMenuItem({ displayText, Icon, iconColor, link, imageUrl })
      }
    >
      {imageUrl ? (
        <Box height="25px" width="25px" mr="10px">
          <img src={imageUrl} height="100%" width="100%" />
        </Box>
      ) : (
        <Icon
          sx={{
            bgcolor: iconColor,
            fill: '#fff',
            borderRadius: '50%',
            height: '25px',
            width: '25px',
            mr: '10px',
          }}
        />
      )}
      <Typography fontSize="14px" fontWeight="600" color="#616161">
        {displayText}
      </Typography>
    </Box>
  );
};
export default MenuListItem;
