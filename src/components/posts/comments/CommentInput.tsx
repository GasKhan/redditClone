import AuthButtons from '@/components/navbar/rightContent/AuthButtons';
import { Box, Button, TextField, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import React from 'react';

type CommentInputProps = {
  user: User;
  commentText: string;
  setCommentText: (value: string) => void;
  createLoading: boolean;
  onCreateComment: () => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  user,
  commentText,
  setCommentText,
  createLoading,
  onCreateComment,
}) => {
  return (
    <Box>
      {user ? (
        <Box display="flex" flexDirection="column">
          <Typography fontSize="12px" mb="7px">
            Comment as{'   '}
            <Box component="span" color="#0079d3">
              {user.displayName}
            </Box>
          </Typography>
          <TextField
            multiline
            minRows="4"
            color="secondary"
            placeholder="What are yout thoughts?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{
              '& textarea': { fontSize: '14px' },
            }}
          />
          <Box
            bgcolor="#eee"
            display="flex"
            justifyContent="flex-end"
            p="5px 10px"
          >
            <Button
              variant="contained"
              color="secondary"
              disabled={commentText ? false : true}
              sx={{
                '&:disabled': {
                  bgcolor: '#7595ae',
                  color: '#fff',
                },
              }}
              onClick={onCreateComment}
            >
              Comment
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display="flex">
          <Typography fontSize="12px" fontWeight="700">
            Log in or sign up to leave a comment
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexGrow="1"
            maxWidth="60%"
          >
            <AuthButtons />
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default CommentInput;
