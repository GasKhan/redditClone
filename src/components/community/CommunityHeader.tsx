import communityStateData, { ICommunity } from '@/atoms/communityAtom';
import Box from '@mui/material/Box';
import React from 'react';
import RedditIcon from '@mui/icons-material/Reddit';
import { Button, Typography } from '@mui/material';
import useCommunityData from '@/hooks/useCommunityData';
import { useRecoilValue } from 'recoil';

type CommunityHeaderProps = {
  communityData: ICommunity;
};

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const { communityInfo, onJoinOrLeaveCommunity, error } = useCommunityData();
  const isUserJoined = communityInfo.communitySnippets.find(
    (com) => com.id === communityData.id
  );
  const community = useRecoilValue(communityStateData);

  return (
    <Box display="flex" flexDirection="column" width="100%" maxWidth="860px">
      <Box height="56px" sx={{ bgcolor: '#0079d3' }}></Box>
      <Box display="flex" p="10px 20px">
        {community.currentCommunity.imageUrl ? (
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: '#fff',
              borderRadius: '50%',
              border: '3px solid #fff',
              position: 'relative',
              top: ' -20px',
              mr: '25px',
            }}
          >
            <img
              src={community.currentCommunity.imageUrl}
              width="100%"
              height="100%"
            />
          </Box>
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
