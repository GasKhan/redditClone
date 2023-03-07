import { AuthModalState } from '@/atoms/authModalAtom';
import communityAtom, { ICommunity } from '@/atoms/communityAtom';
import { ICommunitySnippet } from '@/atoms/communityAtom';
import { auth, firestore } from '@/firebase/clientApp';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useCommunityData = () => {
  const [communityData, setCommunityData] = useRecoilState(communityAtom);
  const [user] = useAuthState(auth);
  const [error, setError] = useState('');
  const setAuthModalState = useSetRecoilState(AuthModalState);
  const router = useRouter();

  const getSnippets = async () => {
    try {
      const userSnippets = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = userSnippets.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunityData((prev) => ({
        ...prev,
        communityFetched: true,
        communitySnippets: snippets as ICommunitySnippet[],
      }));
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  const onJoinOrLeaveCommunity = (
    community: ICommunity,
    isJoined?: boolean
  ) => {
    if (!user) {
      setAuthModalState((prev) => ({ ...prev, isOpen: true }));
      return;
    }

    if (isJoined) {
      leaveCommunity(community);
      return;
    }
    joinCommunity(community);
  };

  const joinCommunity = async (community: ICommunity) => {
    try {
      const batch = writeBatch(firestore);
      const newSnippet: ICommunitySnippet = {
        id: community.id,
        isModerator: user?.uid === community.creatorId,
        imageUrl: community.imageUrl || '',
      };

      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippets`, community.id),
        newSnippet
      );

      batch.update(doc(firestore, 'communities', community.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      setCommunityData((prev) => ({
        ...prev,
        communitySnippets: [...prev.communitySnippets, newSnippet],
      }));
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  const leaveCommunity = async (community: ICommunity) => {
    try {
      const batch = writeBatch(firestore);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${community.id}`)
      );

      batch.update(doc(firestore, `communities/${community.id}`), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityData((prev) => ({
        ...prev,
        communitySnippets: prev.communitySnippets.filter(
          (com) => com.id !== community.id
        ),
      }));
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  const getCommunityData = async (id: string) => {
    try {
      const communityDocRef = doc(firestore, 'communities', id);
      const communityDoc = await getDoc(communityDocRef);

      setCommunityData((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as ICommunity,
      }));
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const { communityId } = router.query;

    if (communityId) {
      const communityInfo = communityData.currentCommunity;

      if (!communityInfo.id) {
        getCommunityData(communityId as string);
        return;
      }
    }
  }, [router.query, communityData.currentCommunity]);

  useEffect(() => {
    if (!user) {
      setCommunityData((prev) => ({
        ...prev,
        communitySnippets: [],
        communityFetched: false,
      }));
      return;
    }
    getSnippets();
  }, [user]);

  return { communityData, setCommunityData, onJoinOrLeaveCommunity, error };
};
export default useCommunityData;
