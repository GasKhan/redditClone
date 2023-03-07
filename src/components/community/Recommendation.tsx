import { ICommunity } from '@/atoms/communityAtom';
import { firestore } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import RedditIcon from '@mui/icons-material/Reddit';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Recommendation: React.FC = () => {
  const [recommedations, setRecommendations] = useState<ICommunity[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityData, setCommunityData, onJoinOrLeaveCommunity } =
    useCommunityData();
  const router = useRouter();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const recommendationQuery = query(
        collection(firestore, 'communities'),
        orderBy('numberOfMembers', 'desc'),
        limit(5)
      );
      const recommendationDocs = await getDocs(recommendationQuery);

      const newRecommendations = recommendationDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecommendations(newRecommendations as ICommunity[]);
    } catch (e: any) {
      console.log('Error getCommunityRecommendations', e.messagge);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Stack
      bgcolor="#fff"
      width="100%"
      border="1px solid #eee"
      borderRadius="4px"
    >
      <Box
        display="flex"
        p="10px"
        borderRadius="4px 4px 0px 0px"
        fontWeight="600"
        alignItems="flex-end"
        justifyContent="flex-start"
        height="75px"
        color="#fff"
        sx={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)) ,url(/images/recCommsArt.png)',
          backgroundSize: 'cover',
        }}
      >
        <Typography>Top Communities</Typography>
      </Box>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rounded" width="100%" height={40} />
        </Stack>
      ) : (
        <Stack border="1px solid #eee">
          {recommedations.map((recommendation, index) => {
            const isJoined = !!communityData.communitySnippets.find(
              (snippet) => snippet.id === recommendation.id
            );

            return (
              <Box
                key={recommendation.id}
                display="flex"
                flexGrow="1"
                alignItems="center"
                borderBottom="1px solid #eee"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#eee',
                  },
                }}
                onClick={() => router.push(`/r/${recommendation.id}`)}
              >
                <Box width="10%" p="10px">
                  {index + 1}
                </Box>
                <Box display="flex" alignItems="center" flexGrow="1">
                  {recommendation.imageUrl ? (
                    <Box mr="7px">
                      <img
                        src={recommendation.imageUrl}
                        height="27px"
                        width="27px"
                      />
                    </Box>
                  ) : (
                    <RedditIcon
                      sx={{
                        width: '30px',
                        height: '30px',
                        bgcolor: '#0079d3',
                        fill: '#fff',
                        borderRadius: '50%',
                        border: '3px solid #fff',
                        mr: '7px',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >{`r/${recommendation.id}`}</span>
                </Box>

                <Button
                  variant={isJoined ? 'contained' : 'outlined'}
                  color="secondary"
                  sx={{
                    height: '20px',
                    p: '5px',
                    fontSize: '12px',
                    justifySelf: 'flex-end',
                    textTransform: 'none',
                  }}
                  onClick={(e) => {
                    console.log('clicked');

                    e.stopPropagation();
                    onJoinOrLeaveCommunity(recommendation, isJoined);
                  }}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </Button>
              </Box>
            );
          })}
        </Stack>
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="5px 10px"
      >
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            fontSize: '14px',
            height: '25px',
            textTransform: 'none',
          }}
        >
          View all
        </Button>
      </Box>
    </Stack>
  );
};
export default Recommendation;
