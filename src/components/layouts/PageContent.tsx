import Box from '@mui/material/Box';
import React from 'react';

const PageContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" width="100%" justifyContent="center">
      <Box display="flex" width="100%" maxWidth="860px" padding="20px 10px">
        <Box
          display="flex"
          flexBasis={{ xs: '100%', md: '65%' }}
          marginRight={{ xs: '0', md: '20px' }}
          flexDirection="column"
        >
          {children && children[0 as keyof typeof children]}
        </Box>
        <Box display={{ xs: 'none', md: 'flex' }} flexGrow="1">
          {children && children[1 as keyof typeof children]}
        </Box>
      </Box>
    </Box>
  );
};
export default PageContent;
