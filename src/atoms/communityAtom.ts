import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface ICommunity {
  id: string;
  authorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  createdAt?: Timestamp;
  imageUrl?: string;
}

export interface ICommunitySnippet {
  id: string;
  isModerator: boolean;
  imageUrl?: string;
}

export type ICommunityState = {
  communitySnippets: ICommunitySnippet[];
  currentCommunity: ICommunity;
};
const defaultCommunityState: ICommunityState = {
  communitySnippets: [],
  currentCommunity: {} as ICommunity,
};

const communityStateData = atom<ICommunityState>({
  key: 'communityStateData',
  default: defaultCommunityState,
});

export default communityStateData;
