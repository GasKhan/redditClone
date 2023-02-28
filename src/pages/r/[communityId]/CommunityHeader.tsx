import { ICommunity } from '@/atoms/communityAtom';
import Box from '@mui/material/Box';
import React from 'react';
import RedditIcon from '@mui/icons-material/Reddit';
import { Button, Typography } from '@mui/material';
import useCommunityData from '@/hooks/useCommunityData';

type CommunityHeaderProps = {
  communityData: ICommunity;
};

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const { communityStateData, onJoinOrLeaveCommunity, error } =
    useCommunityData();
  const isUserJoined = communityStateData.communitySnippets.find(
    (com) => com.id === communityData.id
  );

  return (
    <Box display="flex" flexDirection="column" width="100%" maxWidth="860px">
      <Box height="56px" sx={{ bgcolor: '#0079d3' }}></Box>
      <Box display="flex" p="10px 20px">
        {communityData.imageUrl ? (
          <></>
        ) : (
          <RedditIcon
            sx={{
              width: 60,
              height: 60,
              bgcolor: '#0079d3',
              fill: '#fff',
              borderRadius: '50%',
              border: '3px solid #fff',
              position: 'relative',
              top: ' -20px',
              mr: '25px',
            }}
          />
        )}
        <Box mr="20px">
          <Typography fontSize="25px" fontWeight="700">
            {communityData.id}
          </Typography>
          <Typography color="#9e9e9e">r/{communityData.id}</Typography>
        </Box>

        <Button
          variant={isUserJoined ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => onJoinOrLeaveCommunity(communityData, !!isUserJoined)}
        >
          {isUserJoined ? 'Joined' : 'Join'}
        </Button>
      </Box>
    </Box>
  );
};
export default CommunityHeader;
