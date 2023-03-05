import Box from '@mui/material/Box';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { IComment } from './Comments';
import RedditIcon from '@mui/icons-material/Reddit';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import ArrowCircleDownSharpIcon from '@mui/icons-material/ArrowCircleDownSharp';
import { CircularProgress } from '@mui/material';

type CommentItemProps = {
  commentId: string;
  text: string;
  onDelete: (commentId: string) => void;
  deleteLoading: boolean;
  user: User;
  createdAt: Timestamp;
};

const CommentItem: React.FC<CommentItemProps> = ({
  commentId,
  text,
  onDelete,
  deleteLoading,
  user,
  createdAt,
}) => {
  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center" px="5px">
        <RedditIcon
          sx={{
            height: '40px',
            width: '40px',
            fill: '#9e9e9e',
            bgcolor: '#fff',
            border: '1px solid #9e9e9e',
            borderRadius: '50%',
            p: '3px',
          }}
        />
      </Box>

      <Stack spacing="10px" p="3px">
        <Box display="flex" fontSize="12px">
          <Typography fontSize="12px" fontWeight="700" mr="10px">
            {user.displayName}
          </Typography>
          <Typography fontSize="12px" color="#616161" mr="10px">
            {moment(createdAt.seconds * 1000).fromNow()}
          </Typography>
          {deleteLoading && <CircularProgress size={20} color="secondary" />}
        </Box>
        <Typography fontSize="14px" fontWeight="500" color="#424242">
          {text}
        </Typography>
        <Stack
          direction="row"
          spacing="10px"
          sx={{ cursor: 'pointer' }}
          alignItems="center"
        >
          <ArrowCircleUpSharpIcon
            sx={{
              fill: '#9e9e9e',
              '&:hover': {
                fill: '#2196F3',
              },
            }}
          />
          <ArrowCircleDownSharpIcon
            sx={{
              fill: '#9e9e9e',
              '&:hover': {
                fill: '#2196F3',
              },
            }}
          />
          <Typography
            fontSize="12px"
            color="#616161"
            sx={{
              '&:hover': {
                color: '#2196F3',
              },
            }}
          >
            Edit
          </Typography>
          <Typography
            onClick={() => onDelete(commentId)}
            fontSize="12px"
            color="#616161"
            sx={{
              '&:hover': {
                color: '#2196F3',
              },
            }}
          >
            Delete
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
export default CommentItem;
