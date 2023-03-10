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
import postsAtom, { Post } from '@/atoms/postsAtom';
import moment from 'moment';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import communityStateData from '@/atoms/communityAtom';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import RedditIcon from '@mui/icons-material/Reddit';
import Link from 'next/link';

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number | undefined;
  onVote: (
    e: React.MouseEvent,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDelete: (e: React.MouseEvent, post: Post) => Promise<boolean>;
  onSelect?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userVoteValue,
  userIsCreator,
  onVote,
  onDelete,
  onSelect,
  homePage,
}) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const { currentCommunity } = useRecoilValue(communityStateData);
  const isSinglePost = !onSelect;
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    setLoadingDelete(true);
    try {
      const success = await onDelete(e, post);
      if (!success) throw new Error('Failed to delete post');

      console.log('Deleted with success');

      if (isSinglePost) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (e: any) {
      console.log(e.message);
      setDeleteError(true);
    }
    setLoadingDelete(false);
  };

  return (
    <Box
      display="flex"
      border={isSinglePost ? 'none' : '1px solid #9e9e9e'}
      borderRadius={!isSinglePost ? '3px 3px 0 0 ' : '3px'}
      sx={{
        '&:hover': {
          borderColor: !isSinglePost ? '#000' : '',
          cursor: !isSinglePost ? 'pointer' : 'inherit',
        },
      }}
      onClick={() => {
        if (!loadingDelete) onSelect && onSelect(post);
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="35px"
        bgcolor={isSinglePost ? '#fff' : '#eeeeee'}
        p="10px"
        borderRadius="3px"
      >
        <ArrowCircleUpSharpIcon
          onClick={(e: React.MouseEvent) =>
            onVote(e, post, 1, currentCommunity.id)
          }
          sx={{
            fill: userVoteValue === 1 ? '#fff' : '#9e9e9e',
            bgcolor: userVoteValue === 1 ? '#ff4300' : 'inherit',
            borderRadius: '50%',
          }}
        />
        <Typography>{post.voteStatus}</Typography>
        <ArrowCircleDownSharpIcon
          onClick={(e: React.MouseEvent) =>
            onVote(e, post, -1, currentCommunity.id)
          }
          sx={{
            fill: userVoteValue === -1 ? '#fff' : '#9e9e9e',
            bgcolor: userVoteValue === -1 ? '#0079d3' : 'inherit',
            borderRadius: '50%',
          }}
        />
      </Box>

      <Stack
        flexGrow="1"
        bgcolor="#fff"
        p="10px 15px"
        borderRadius="3px"
        sx={{ '&:hover': { bgcolor: !isSinglePost ? '#eeeeee' : '' } }}
      >
        {deleteError && (
          <Alert severity="error">Error while deleting post</Alert>
        )}
        <Box display="flex" alignItems="center">
          {homePage && (
            <Box
              display="flex"
              alignItems="center"
              mr="10px"
              onClick={(e) => e.stopPropagation()}
            >
              {post.communityImageUrl ? (
                <img
                  src={post.communityImageUrl}
                  height="25px"
                  width="25px"
                  style={{ marginRight: '5px' }}
                />
              ) : (
                <RedditIcon
                  sx={{
                    height: '25px',
                    width: '25px',
                    bgcolor: '#9e9e9e',
                    fill: '#fff',
                    borderRadius: '50%',
                    mr: '10px',
                  }}
                />
              )}
              <Link
                href={`r/${post.communityId}`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <Typography
                  fontSize="12px"
                  fontWeight="600"
                  sx={{ '&:hover': { textDecoration: 'underline' } }}
                >
                  {post.communityId}
                </Typography>
              </Link>
            </Box>
          )}
          <Typography color="#9e9e9e" fontSize="12px">
            Posted by u/{post.creatorDisplayName} a{' '}
            {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
          </Typography>
        </Box>

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
              {post.numberOfComments}
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
