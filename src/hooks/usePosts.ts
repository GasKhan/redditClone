import { AuthModalState } from '@/atoms/authModalAtom';
import communityStateData, { ICommunity } from '@/atoms/communityAtom';
import postsAtom, { IPostVote, Post } from '@/atoms/postsAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const usePosts = () => {
  const [postsData, setPostsData] = useRecoilState(postsAtom);
  const [communityState, setCommunityState] =
    useRecoilState(communityStateData);
  const [user, loadingUser] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(AuthModalState);
  const router = useRouter();

  const onDeletePost = async (
    e: React.MouseEvent,
    post: Post
  ): Promise<boolean> => {
    e.stopPropagation();
    try {
      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, 'posts', post.id!);
      await deleteDoc(postDocRef);

      setPostsData((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (e: any) {
      console.log(e.message);
      return false;
    }
  };

  const onVotePost = async (
    e: React.MouseEvent,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    e.stopPropagation();
    if (!user?.uid) {
      setAuthModalState({
        view: 'logIn',
        isOpen: true,
      });

      return;
    }

    const { voteStatus } = post;
    const existingPostVote = postsData.postVotes.find(
      (vote) => vote.postId === post.id
    );

    try {
      const batch = writeBatch(firestore);

      let updatedPosts = [...postsData.posts];
      let updatedPostVotes = [...postsData.postVotes];
      const updatedPost = { ...post };

      let voteChange = vote;

      if (!existingPostVote) {
        const postVoteRef = doc(
          collection(firestore, `users/${user!.uid}/postVotes`)
        );

        const newVote: IPostVote = {
          id: postVoteRef.id,
          postId: post.id as string,
          communityId,
          voteStatus: vote,
        };

        updatedPost.voteStatus = voteStatus + voteChange;
        updatedPostVotes = [...updatedPostVotes, newVote];

        batch.set(postVoteRef, newVote);
      } else {
        const postVoteRef = doc(
          firestore,
          'users',
          `/${user!.uid}/postVotes/${existingPostVote.id}`
        );

        if (existingPostVote.voteStatus === vote) {
          voteChange *= -1;
          updatedPost.voteStatus = voteStatus + voteChange;

          updatedPostVotes = updatedPostVotes.filter((v) => {
            return v.id !== existingPostVote.id;
          });

          batch.delete(postVoteRef);
        } else {
          voteChange = 2 * voteChange;
          updatedPost.voteStatus = voteStatus + voteChange;

          updatedPostVotes = updatedPostVotes.map((v) => {
            if (v.id === existingPostVote.id) {
              return {
                ...existingPostVote,
                voteStatus: vote,
              };
            }
            return v;
          });

          batch.update(postVoteRef, {
            voteStatus: vote,
          });
        }
      }

      updatedPosts = updatedPosts.map((p) => {
        if (p.id === post.id) return updatedPost;
        return p;
      });

      let updatedState = {
        ...postsData,
        posts: [...updatedPosts],
        postVotes: [...updatedPostVotes],
      };

      if (updatedState.selectedPost) {
        updatedState = {
          ...updatedState,
          selectedPost: updatedPost,
        };
      }

      setPostsData(updatedState);
      const postRef = doc(firestore, 'posts', post.id as string);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });

      await batch.commit();
    } catch (e: any) {
      console.log('onVote error', e.message);
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    try {
      if (!user) return;
      const postVotesQuery = query(
        collection(firestore, `users/${user!.uid}/postVotes`),
        where('communityId', '==', communityId)
      );

      const postVotesDocs = await getDocs(postVotesQuery);
      const postVotes = postVotesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostsData((prev) => ({
        ...prev,
        postVotes: postVotes as IPostVote[],
      }));
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!user?.uid || !communityState.currentCommunity) return;
    getCommunityPostVotes(communityState.currentCommunity.id);
  }, [user, communityState.currentCommunity]);

  useEffect(() => {
    if (!user?.uid || loadingUser) {
      setPostsData((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user, loadingUser]);

  const onSelectPost = (post: Post) => {
    setPostsData((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(
      `/r/${communityState.currentCommunity.id}/comments/${post.id} `
    );
  };

  return {
    postsData,
    setPostsData,
    onDeletePost,
    onVotePost,
    onSelectPost,
  };
};

export default usePosts;
