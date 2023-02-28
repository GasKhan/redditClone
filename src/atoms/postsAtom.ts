import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export type Post = {
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageUrl?: string;
  communityImageUrl?: string;
  createdAt: Timestamp;
};

interface IPostsState {
  selectedPost: Post | null;
  posts: Post[];
}

const defaultPosts: IPostsState = {
  selectedPost: null,
  posts: [],
};

const postsAtom = atom<IPostsState>({
  key: 'postsAtom',
  default: defaultPosts,
});
export default postsAtom;
