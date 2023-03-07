import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import RedditIcon from '@mui/icons-material/Reddit';

const PersonalHome: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        bgcolor: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: '#eee',
        position: 'sticky',
      }}
    >
      <Box
        display="flex"
        alignItems="flex-end"
        sx={{
          color: '#fff',
          p: '6px 10px',
          bgcolor: '#0079d3',
          height: '54px',
          borderRadius: '4px 4px 0px 0px',
          fontWeight: '600',
          backgroundImage: 'url(/images/redditPersonalHome.png)',
          backgroundSize: 'cover',
        }}
      ></Box>
      <Box display="flex" flexDirection="column" p="12px">
        <Box alignItems="center" mb="15px">
          <RedditIcon
            sx={{
              width: '50px',
              height: '50px',
              bgcolor: '#ff4300',
              fill: '#fff',
              borderRadius: '50%',
              mr: '25px',
            }}
          />
          <Typography fontWeight="600">Home</Typography>
        </Box>
        <Stack spacing={3}>
          <Typography fontSize="9pt">
            Your personal Reddit frontpage, built for you.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ height: '30px' }}>
            Create Post
          </Button>
          <Button variant="outlined" color="secondary" sx={{ height: '30px' }}>
            Create Community
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default PersonalHome;
