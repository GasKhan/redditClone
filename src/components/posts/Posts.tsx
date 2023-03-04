import communityStateData, { ICommunity } from '@/atoms/communityAtom';
import { Post } from '@/atoms/postsAtom';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import Box from '@mui/material/Box';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
  communityData: ICommunity;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const { postsData, setPostsData, onDeletePost, onVotePost, onSelectPost } =
    usePosts();

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsRef = collection(firestore, 'posts');
      const postsQuery = query(
        postsRef,
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc')
      );
      const postsFromDB = await getDocs(postsQuery);
      const posts = postsFromDB.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostsData((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (e: any) {
      console.log(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <PostLoader />
  ) : (
    <Box>
      {postsData.posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          userVoteValue={
            postsData.postVotes.find((vote) => vote.postId === post.id)
              ?.voteStatus
          }
          userIsCreator={user?.uid === post.creatorId}
          onVote={onVotePost}
          onDelete={onDeletePost}
          onSelect={onSelectPost}
        />
      ))}
    </Box>
  );
};
export default Posts;
