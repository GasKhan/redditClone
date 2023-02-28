import postsAtom from '@/atoms/postsAtom';
import { useRecoilState } from 'recoil';

const usePosts = () => {
  const [postsData, setPostsData] = useRecoilState(postsAtom);

  const onDeletePost = () => {};

  const onVotePost = () => {};

  const onSelectPost = () => {};

  return {
    postsData,
    setPostsData,
    onDeletePost,
    onVotePost,
    onSelectPost,
  };
};

export default usePosts;
