import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/clientApp';
import { GetServerSidePropsContext } from 'next';
import { ICommunity } from '@/atoms/communityAtom';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '../../../components/CommunityNotFound';
import CommunityHeader from './CommunityHeader';
import { Box } from '@mui/material';
import PageContent from '../../../components/layouts/PageContent';
import CreatePostLink from '@/components/CreatePostLink';
import Posts from '@/components/posts/Posts';

type CommunityPageProps = {
  communityData: ICommunity;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) return <NotFound />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <></>
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
