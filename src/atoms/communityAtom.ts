import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface ICommunity {
  id: string;
  creatorId: string;
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
  communityFetched: boolean;
};

export const defaultCommunity: ICommunity = {
  id: '',
  creatorId: '',
  numberOfMembers: 0,
  privacyType: 'public',
};

export const defaultCommunityState: ICommunityState = {
  communitySnippets: [],
  currentCommunity: defaultCommunity,
  communityFetched: false,
};

const communityStateData = atom<ICommunityState>({
  key: 'communityStateData',
  default: defaultCommunityState,
});

export default communityStateData;
