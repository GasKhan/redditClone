import postsAtom, { Post } from '@/atoms/postsAtom';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';

const usePosts = () => {
  const [postsData, setPostsData] = useRecoilState(postsAtom);

  const onDeletePost = async (post: Post): Promise<boolean> => {
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
