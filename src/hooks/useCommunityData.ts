import { AuthModalState } from '@/atoms/authModalAtom';
import communityAtom, { ICommunity } from '@/atoms/communityAtom';
import { ICommunitySnippet } from '@/atoms/communityAtom';
import { auth, firestore } from '@/firebase/clientApp';
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useCommunityData = () => {
  const [communityStateData, setCommunityStateData] =
    useRecoilState(communityAtom);
  const [user] = useAuthState(auth);
  const [error, setError] = useState('');
  const setAuthModalState = useSetRecoilState(AuthModalState);

  const getSnippets = async () => {
    try {
      const userSnippets = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = userSnippets.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateData((prev) => ({
        ...prev,
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
        isModerator: false,
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

      setCommunityStateData((prev) => ({
        ...prev,
        communitySnippets: [newSnippet],
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

      setCommunityStateData((prev) => ({
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

  useEffect(() => {
    if (!user) return;
    getSnippets();
  }, [user]);

  return { communityStateData, onJoinOrLeaveCommunity, error };
};
export default useCommunityData;
