import Skeleton from '@mui/material/Skeleton';
import React from 'react';

const PostLoader: React.FC = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height="250px"
        width="100%"
        style={{ marginBottom: 6 }}
      />
      <Skeleton animation="wave" height={10} width="80%" />
    </>
  );
};
export default PostLoader;
