import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const CommunityNotFound: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="0px auto"
      padding="150px 15px"
    >
      <Typography fontSize="23px" fontWeight="600" mb="25px">
        Sorry, this community does not exists, or has been banned
      </Typography>
      <Box>
        <Link href="/">
          <Button variant="contained" color="secondary">
            GO HOME
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
export default CommunityNotFound;
