import communityStateData from '@/atoms/communityAtom';
import { IPostVote, Post } from '@/atoms/postsAtom';
import PersonalHome from '@/components/community/PersonalHome';
import Premium from '@/components/community/Premium';
import Recommendation from '@/components/community/Recommendation';
import CreatePostLink from '@/components/posts/CreatePostLink';
import PageContent from '@/components/layouts/PageContent';
import CreateCommunityModal from '@/components/modals/CreateCommunityModal';
import PostItem from '@/components/posts/PostItem';
import { auth, firestore } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import usePosts from '@/hooks/usePosts';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  const [user, userLoading] = useAuthState(auth);
  const { communityData } = useCommunityData();
  const [loading, setLoading] = useState(false);
  const { postsData, setPostsData, onVotePost, onDeletePost, onSelectPost } =
    usePosts();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      const communitySnippets = communityData.communitySnippets.map(
        (snippet) => snippet.id
      );

      if (communitySnippets.length) {
        const snippetsQuery = query(
          collection(firestore, 'posts'),
          where('communityId', 'in', communitySnippets),
          orderBy('voteStatus', 'asc'),
          limit(10)
        );
        const postsDocs = await getDocs(snippetsQuery);

        const newPosts = postsDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostsData((prev) => ({
          ...prev,
          posts: newPosts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (e: any) {
      console.log('Error buildUserHomeFeed', e.message);
    }
    setLoading(false);
  };
  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10)
      );
      const postsDocs = await getDocs(postsQuery);

      const newPosts = postsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostsData((prev) => ({
        ...prev,
        posts: newPosts as Post[],
      }));
    } catch (e: any) {
      console.log('Error buildNoUserHomeFeed', e.message);
    }
    setLoading(false);
  };
  const getUserPostVotes = async () => {
    const postsIds = postsData.posts.map((post) => post.id);
    try {
      if (postsIds.length) {
        const postVotesRef = query(
          collection(firestore, `users/${user?.uid}/postVotes`),
          where('postId', 'in', postsIds)
        );
        const postVotesDocs = await getDocs(postVotesRef);

        const newPostVotes = postVotesDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostsData((prev) => ({
          ...prev,
          postVotes: newPostVotes as IPostVote[],
        }));
      }
    } catch (e: any) {
      console.log('Error getUserPostVotes', e.message);
    }
  };

  useEffect(() => {
    if (communityData.communityFetched) buildUserHomeFeed();
  }, [communityData.communityFetched]);

  useEffect(() => {
    if (!user && !userLoading) buildNoUserHomeFeed();
  }, [user, userLoading]);

  useEffect(() => {
    if (user && postsData.postVotes.length) getUserPostVotes();

    return () => {
      setPostsData((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postsData.posts]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="rounded" width="100%" height={60} />
          </Stack>
        ) : (
          <Stack spacing="10px">
            {postsData.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                userIsCreator={user?.uid === post.creatorId}
                userVoteValue={
                  postsData.postVotes.find(
                    (postVote) => postVote.postId === post.id
                  )?.voteStatus
                }
                onVote={onVotePost}
                onDelete={onDeletePost}
                onSelect={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={2}>
        <Recommendation />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContent>
  );
}
