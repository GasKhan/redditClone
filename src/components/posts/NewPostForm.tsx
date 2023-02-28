import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import LinkIcon from '@mui/icons-material/Link';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import TabItem from './TabItem';
import TextInputs from './postForm/TextInputs';
import ImageUpload from './postForm/ImageUpload';
import { Post } from '@/atoms/postsAtom';
import { User } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import communityAtom from '@/atoms/communityAtom';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Alert from '@mui/material/Alert';

type NewPostFormProps = {
  user: User;
};

export interface ITab {
  title: string;
  icon: React.ReactElement;
}
const tabs: ITab[] = [
  {
    title: 'Post',
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: 'Images & Video',
    icon: <WallpaperIcon />,
  },
  {
    title: 'Link',
    icon: <LinkIcon sx={{ transform: 'rotate(125deg)' }} />,
  },
  {
    title: 'Poll',
    icon: <PollOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />,
  },
  {
    title: 'Talk',
    icon: <KeyboardVoiceOutlinedIcon />,
  },
];

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  const [postValue, setPostValue] = useState({
    title: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const { currentCommunity } = useRecoilValue(communityAtom);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result)
        setSelectedFile(readerEvent.target.result as string);
    };
  };

  const handlePostSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { communityId } = router.query;
    setLoading(true);
    try {
      const newPost: Post = {
        communityId: communityId as string,
        creatorId: user.uid,
        creatorDisplayName: user.email!.split('@')[0] as string,
        title: postValue.title,
        body: postValue.body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
      };

      // Store post in db
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      // Store image in storage
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadUrl = await getDownloadURL(imageRef);

        //Update post in db by adding imageUrl
        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
        });

        router.back();
      }
    } catch (e: any) {
      console.log(e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Box bgcolor="#fff">
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          borderBottom="1px solid #f1ecec"
        >
          {tabs.map((tab) => (
            <TabItem
              key={tab.title}
              tab={tab}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Stack>
        {selectedTab === 'Post' && (
          <TextInputs
            loading={loading}
            postValue={postValue}
            handleTextChange={handleTextChange}
            handlePostSubmit={handlePostSubmit}
          />
        )}
        {selectedTab === 'Images & Video' && (
          <ImageUpload
            selectedFile={selectedFile as string}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            handleImageChange={handleImageChange}
          />
        )}
      </Box>

      {error && <Alert severity="error">Error while creating post</Alert>}
    </>
  );
};
export default NewPostForm;
