import { ICommunity } from '@/atoms/communityAtom';
import { Button, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

type AboutProps = {
  community: ICommunity;
};

const About: React.FC<AboutProps> = ({ community }) => {
  const router = useRouter();
  return (
    <Stack width="100%">
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        p="10px"
        bgcolor="#0079d3"
        borderRadius=" 4px 4px 0 0 "
      >
        <Typography color="#fff" fontSize="12px" flexGrow="1">
          About community
        </Typography>
        <MoreHorizOutlinedIcon sx={{ fill: '#fff' }} />
      </Box>
      <Stack p="10px 15px" bgcolor="#fff">
        <Box display="flex" mb="15px">
          <Box display="flex" flexDirection="column" flexGrow="1">
            <Typography fontSize="12px" fontWeight="700">
              {community.numberOfMembers.toLocaleString()}
            </Typography>
            <Typography fontSize="12px" fontWeight="700">
              members
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            flexGrow="1"
          >
            <Typography fontSize="12px" fontWeight="700">
              1
            </Typography>
            <Typography fontSize="12px" fontWeight="700">
              online
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: '15px' }} />
        <Box display="flex" alignItems="self-end" mb="12px">
          <CakeOutlinedIcon
            height="10px"
            width="10px"
            sx={{ mr: '5px', fill: '#9e9e9e' }}
          />
          <Typography fontSize="12px" fontWeight="700" color="#9e9e9e">
            Created{' '}
            {moment(new Date(community.createdAt!.seconds * 1000)).format(
              'MMM DD, YYYY'
            )}
          </Typography>
        </Box>
        <Box display="flex" width="100%" justifyContent="center">
          <Link
            href={`/r/${router.query.communityId}/submit`}
            style={{ width: '100%' }}
          >
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'none',
                m: '0',
              }}
            >
              Create post
            </Button>
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
};
export default About;
