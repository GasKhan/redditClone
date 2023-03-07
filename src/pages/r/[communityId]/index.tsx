import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/clientApp';
import { GetServerSidePropsContext } from 'next';
import communityStateData, { ICommunity } from '@/atoms/communityAtom';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '../../../components/CommunityNotFound';
import CommunityHeader from '../../../components/community/CommunityHeader';
import { Box } from '@mui/material';
import PageContent from '../../../components/layouts/PageContent';
import CreatePostLink from '@/components/CreatePostLink';
import Posts from '@/components/posts/Posts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import About from '@/components/community/About';

type CommunityPageProps = {
  communityData: ICommunity;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) return <NotFound />;

  const [communityState, setCommunityState] =
    useRecoilState(communityStateData);

  useEffect(() => {
    setCommunityState((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <CommunityHeader communityInfo={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About community={communityData} />
        </>
      </PageContent>
    </Box>
  );
};
export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityId = context.query.communityId;

    const communityDocRef = doc(
      firestore,
      'communities',
      communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              })
            )
          : '',
      },
    };
  } catch (e) {
    console.log(e);
  }
}
