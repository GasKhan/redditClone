import { ICommunity } from '@/atoms/communityAtom';
import postsAtom, { Post } from '@/atoms/postsAtom';
import { firestore } from '@/firebase/clientApp';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/system/Stack';
import { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import Skeleton from '@mui/material/Skeleton';

export interface IComment {
  id: string;
  creatorId: string;
  creatorDisplayName: string;
  communityId: string;
  postId: string;
  text: string;
  createdAt: Timestamp;
}

type CommentsProps = {
  user: User;
  communityId: string;
  selectedPost: Post;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  communityId,
  selectedPost,
}) => {
  const setPostsData = useSetRecoilState(postsAtom);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState('');

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);

      const commentRef = doc(collection(firestore, 'comments'));
      const newComment: IComment = {
        id: commentRef.id,
        creatorId: user.uid,
        creatorDisplayName: user.displayName!,
        communityId: communityId,
        postId: selectedPost.id!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentRef, newComment);

      const postRef = doc(firestore, `posts/${selectedPost.id}`);
      batch.update(postRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      setCommentText('');

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
      setComments((prev) => [newComment, ...prev]);

      setPostsData((prev) => ({
        ...prev,
        selectedPost: {
          ...selectedPost,
          numberOfComments: selectedPost.numberOfComments + 1,
        },
      }));
    } catch (e: any) {
      console.log('Error while creating comment', e.message);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async (commentId: string) => {
    setDeleteLoadingId(commentId);

    try {
      const batch = writeBatch(firestore);

      const commentRef = doc(firestore, 'comments', commentId);
      batch.delete(commentRef);

      const postRef = doc(firestore, `posts/${selectedPost.id}`);
      batch.update(postRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      setPostsData((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (e: any) {
      console.log('Error while deleting the comment', e.message);
    }

    setDeleteLoadingId('');
  };
  const getPostComments = async (postId: string) => {
    setFetchLoading(true);
    try {
      const commentsQuery = query(
        collection(firestore, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      );
      const commentsDocs = await getDocs(commentsQuery);
      const commentsArr = commentsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(commentsArr as IComment[]);
    } catch (e: any) {
      console.log('Error while getting comments', e.message);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (selectedPost) getPostComments(selectedPost.id!);
  }, [selectedPost]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      bgcolor="#fff"
      borderRadius="0px 0px 3px 3px"
      p="20px 20px 20px 30px"
    >
      {fetchLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rounded" width="100%" height={60} />
        </Stack>
      ) : (
        <>
          <CommentInput
            user={user}
            commentText={commentText}
            setCommentText={setCommentText}
            onCreateComment={onCreateComment}
            createLoading={createLoading}
          />
          <Stack spacing="15px" p="25px 10px">
            {comments.map((comment) => {
              return (
                <CommentItem
                  key={comment.id}
                  commentId={comment.id}
                  user={user}
                  createdAt={comment.createdAt}
                  text={comment.text}
                  onDelete={onDeleteComment}
                  deleteLoading={deleteLoadingId === comment.id}
                />
              );
            })}
          </Stack>
        </>
      )}
      {!comments.length && (
        <Typography
          p="20px"
          color="#9e9e9e"
          flexGrow="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          No comments yet
        </Typography>
      )}
    </Box>
  );
};
export default Comments;
