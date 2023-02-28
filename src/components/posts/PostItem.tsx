import Box from '@mui/material/Box';
import React, { useState } from 'react';
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import ArrowCircleDownSharpIcon from '@mui/icons-material/ArrowCircleDownSharp';
import {
  Alert,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Post } from '@/atoms/postsAtom';
import moment from 'moment';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number | undefined;
  onVote: () => void;
  onDelete: (post: Post) => Promise<boolean>;
  onSelect: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userVoteValue,
  userIsCreator,
  onVote,
  onDelete,
  onSelect,
}) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDelete(post);
      if (!success) throw new Error('Failed to delete post');

      console.log('Deleted with success');
    } catch (e: any) {
      console.log(e.message);
      setDeleteError(true);
    }
    setLoadingDelete(true);
  };

  return (
    <Box display="flex" border="1px solid #9e9e9e" mb="10px" borderRadius="3px">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="35px"
        bgcolor="#eeeeee"
        p="10px"
      >
        <ArrowCircleUpSharpIcon
          onClick={onVote}
          sx={{
            fill: userVoteValue === 1 ? '#fff' : '#9e9e9e',
            bgcolor: userVoteValue === 1 ? '#ff4300' : 'inherit',
            borderRadius: '50%',
          }}
        />
        <Typography>{post.voteStatus}</Typography>
        <ArrowCircleDownSharpIcon
          onClick={onVote}
          sx={{
            fill: userVoteValue === -1 ? '#fff' : '#9e9e9e',
            bgcolor: userVoteValue === -1 ? '#ff4300' : 'inherit',
            borderRadius: '50%',
          }}
        />
      </Box>

      <Stack flexGrow="1" bgcolor="#fff" p="10px 15px">
        {deleteError && (
          <Alert severity="error">Error while deleting post</Alert>
        )}
        <Typography color="#9e9e9e" fontSize="12px">
          Posted by u/{post.creatorDisplayName} a{' '}
          {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
        </Typography>
        <Typography fontWeight="700">{post.title}</Typography>
        <Typography fontSize="12px" fontWeight="500" mb="10px">
          {post.body}
        </Typography>
        {post.imageUrl && (
          <Box mb="20px">
            {imgLoading && (
              <Skeleton
                variant="rectangular"
                animation="wave"
                height="250px"
                width="100%"
              />
            )}
            <Box display={imgLoading ? 'none' : 'flex'}>
              <img
                src={post.imageUrl}
                width="100%"
                height="100%"
                onLoad={() => setImgLoading(false)}
              />
            </Box>
          </Box>
        )}
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            mr="15px"
            p="5px"
            sx={{
              '&:hover': {
                bgcolor: '#eee',
                cursor: 'pointer',
              },
            }}
          >
            <ChatBubbleOutlineRoundedIcon
              sx={{ fill: '#9e9e9e', mr: '3px', height: '20px' }}
            />
            <Typography sx={{ color: '#9e9e9e', fontSize: '12px' }}>
              {post.voteStatus}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            mr="15px"
            p="5px"
            sx={{
              '&:hover': {
                bgcolor: '#eee',
                cursor: 'pointer',
              },
            }}
          >
            <ReplyOutlinedIcon
              sx={{ fill: '#9e9e9e', mr: '3px', height: '20px' }}
            />
            <Typography sx={{ color: '#9e9e9e', fontSize: '12px' }}>
              Share
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            mr="15px"
            p="5px"
            sx={{
              '&:hover': {
                bgcolor: '#eee',
                cursor: 'pointer',
              },
            }}
          >
            <BookmarkBorderOutlinedIcon
              sx={{ fill: '#9e9e9e', mr: '3px', height: '20px' }}
            />
            <Typography sx={{ color: '#9e9e9e', fontSize: '12px' }}>
              Save
            </Typography>
          </Box>
          {userIsCreator && (
            <Box
              display="flex"
              alignItems="center"
              mr="15px"
              p="5px"
              onClick={handleDelete}
              sx={{
                '&:hover': {
                  bgcolor: '#eee',
                  cursor: 'pointer',
                },
              }}
            >
              {loadingDelete ? (
                <CircularProgress sx={{ color: '#9e9e9e' }} size="17px" />
              ) : (
                <>
                  <DeleteOutlineOutlinedIcon
                    sx={{ fill: '#9e9e9e', mr: '3px', height: '20px' }}
                  />
                  <Typography sx={{ color: '#9e9e9e', fontSize: '12px' }}>
                    Delete
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
export default PostItem;
