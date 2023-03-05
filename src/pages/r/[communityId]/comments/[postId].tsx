import communityStateData, { ICommunity } from '@/atoms/communityAtom';
import { Post } from '@/atoms/postsAtom';
import About from '@/components/community/About';
import PageContent from '@/components/layouts/PageContent';
import PostItem from '@/components/posts/PostItem';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';

const SinglePostPage: React.FC = () => {
  const { postsData, setPostsData, onVotePost, onDeletePost } = usePosts();
  const [communityState, setCommunityState] =
    useRecoilState(communityStateData);
  const [user] = useAuthState(auth);
  const { selectedPost: post } = postsData;
  const router = useRouter();

  const fetchSinglePost = async (id: string) => {
    try {
      const postDocRef = doc(firestore, 'posts', id);
      const postDoc = await getDoc(postDocRef);

      setPostsData((prev) => ({
        ...prev,
        selectedPost: {
          id: postDoc.id,
          ...postDoc.data(),
        } as Post,
      }));
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const { postId } = router.query;
    if (postId && !postsData.selectedPost) fetchSinglePost(postId as string);
  }, [router.query, postsData.selectedPost]);

  return (
    <PageContent>
      <>
        <>
          {postsData.selectedPost && (
            <PostItem
              post={postsData.selectedPost}
              onVote={onVotePost}
              onDelete={onDeletePost}
              userIsCreator={user?.uid === post?.creatorId}
              userVoteValue={
                postsData.postVotes.find((vote) => vote.postId === post?.id)
                  ?.voteStatus
              }
            />
          )}
        </>
      </>
      <>
        {communityState.currentCommunity.id && (
          <About community={communityState.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default SinglePostPage;
