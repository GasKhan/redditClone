import communityStateData from '@/atoms/communityAtom';
import About from '@/components/community/About';
import PageContent from '@/components/layouts/PageContent';
import NewPostForm from '@/components/posts/NewPostForm';
import { auth } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import { Typography } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  const [user] = useAuthState(auth);
  const { communityData } = useCommunityData();
  return (
    <PageContent>
      <>
        <Typography m="25px 0 20px" fontSize="25px" fontWeight="700">
          Create a post
        </Typography>
        {user && <NewPostForm user={user} />}
      </>
      {communityData.currentCommunity.id && (
        <About community={communityData.currentCommunity} />
      )}
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
