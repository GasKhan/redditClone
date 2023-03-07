import communityStateData, { ICommunity } from '@/atoms/communityAtom';
import { Button, CircularProgress, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useRef, useState } from 'react';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import moment from 'moment';
import Link from 'next/link';
import RedditIcon from '@mui/icons-material/Reddit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useRecoilState, useSetRecoilState } from 'recoil';

type AboutProps = {
  community: ICommunity;
};

const About: React.FC<AboutProps> = ({ community }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [communityState, setCommunityState] =
    useRecoilState(communityStateData);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const selectImgRef = useRef<HTMLInputElement>(null);

  const handleSaveImageChange = async () => {
    try {
      setLoading(true);
      if (selectedFile) {
        const imgRef = ref(storage, `communities/${community.id}/image`);
        await uploadString(imgRef, selectedFile, 'data_url');
        const downloadUrl = await getDownloadURL(imgRef);

        const docRef = doc(firestore, 'communities', community.id);
        updateDoc(docRef, {
          imageUrl: downloadUrl,
        });

        const snippetRef = doc(
          firestore,
          `users/${user?.uid}/communitySnippets/${community.id}`
        );
        updateDoc(snippetRef, {
          imageUrl: downloadUrl,
        });

        const newCommunitySnippets = communityState.communitySnippets.map(
          (snippet) => {
            if (snippet.id === community.id) {
              return {
                ...snippet,
                imageUrl: downloadUrl,
              };
            }
            return snippet;
          }
        );

        setCommunityState((prev) => ({
          ...prev,
          communitySnippets: newCommunitySnippets,
          currentCommunity: {
            ...prev.currentCommunity,
            imageUrl: downloadUrl,
          },
        }));

        setSelectedFile('');
      }
    } catch (e: any) {
      console.log(e.message);
    }
    setLoading(false);
  };

  return (
    <Stack width="100%" sx={{ position: 'sticky', top: '20px' }}>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        p="10px"
        bgcolor="#0079d3"
        borderRadius=" 4px 4px 0 0 "
      >
        <Typography color="#fff" fontSize="12px" flexGrow="1">
          About community
        </Typography>
        <MoreHorizOutlinedIcon sx={{ fill: '#fff' }} />
      </Box>
      <Stack p="10px 15px" bgcolor="#fff">
        <Box display="flex" mb="15px">
          <Box display="flex" flexDirection="column" flexGrow="1">
            <Typography fontSize="12px" fontWeight="700">
              {community.numberOfMembers.toLocaleString()}
            </Typography>
            <Typography fontSize="12px" fontWeight="700">
              members
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            flexGrow="1"
          >
            <Typography fontSize="12px" fontWeight="700">
              1
            </Typography>
            <Typography fontSize="12px" fontWeight="700">
              online
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: '15px' }} />
        <Box display="flex" alignItems="self-end" mb="12px">
          <CakeOutlinedIcon
            height="10px"
            width="10px"
            sx={{ mr: '5px', fill: '#9e9e9e' }}
          />
          <Typography fontSize="12px" fontWeight="700" color="#9e9e9e">
            Created{' '}
            {moment(new Date(community.createdAt!.seconds * 1000)).format(
              'MMM DD, YYYY'
            )}
          </Typography>
        </Box>
        <Box display="flex" width="100%" justifyContent="center" mb="10px">
          <Link
            href={`/r/${community.id}/submit`}
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'none',
                m: '0',
              }}
            >
              Create post
            </Button>
          </Link>
        </Box>
        <Divider />
        {true && (
          <Stack>
            <Typography fontWeight="700" fontSize="14px" my="10px">
              Admin
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="button"
                onClick={() => selectImgRef.current!.click()}
                sx={{
                  border: 'none',
                  bgcolor: '#fff',
                  p: '0',
                  color: '#0079d3',
                  fontSize: '12px',
                  fontWeight: '700',
                  '&:hover': {
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  },
                }}
              >
                Change image
              </Typography>
              {selectedFile || community.imageUrl ? (
                <Box
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="center"
                  sx={{
                    borderRadius: '50%',
                    height: '30px',
                    width: '30px',
                  }}
                >
                  <img
                    src={
                      selectedFile || communityState.currentCommunity.imageUrl
                    }
                    width="100%"
                    height="100%"
                  />
                </Box>
              ) : (
                <RedditIcon
                  sx={{
                    width: 35,
                    height: 35,
                    bgcolor: '#9e9e9e',
                    fill: '#fff',
                    borderRadius: '50%',
                  }}
                />
              )}
            </Box>
            <input
              type="file"
              hidden
              ref={selectImgRef}
              onChange={onSelectFile}
            />
            {selectedFile && (
              <Box
                component="button"
                onClick={handleSaveImageChange}
                sx={{
                  border: 'none',
                  bgcolor: '#fff',
                  p: '0',

                  '&:hover': {
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '700',
                      textAlign: 'start',
                    }}
                  >
                    Save changes{' '}
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
export default About;
