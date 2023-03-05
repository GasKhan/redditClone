import { Post } from '@/atoms/postsAtom';
import About from '@/components/community/About';
import PageContent from '@/components/layouts/PageContent';
import Comments from '@/components/posts/comments/Comments';
import PostItem from '@/components/posts/PostItem';
import { auth, firestore } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import usePosts from '@/hooks/usePosts';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const SinglePostPage: React.FC = () => {
  const { postsData, setPostsData, onVotePost, onDeletePost } = usePosts();
  const { communityData } = useCommunityData();
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
            <>
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
              <Comments
                user={user!}
                communityId={communityData.currentCommunity.id}
                selectedPost={post!}
              />
            </>
          )}
        </>
      </>
      <>
        {communityData.currentCommunity.id && (
          <About community={communityData.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default SinglePostPage;
