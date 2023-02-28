import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useRef } from 'react';

type ImageUploadProps = {
  setSelectedTab: (tab: string) => void;
  setSelectedFile: (file: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: string;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  setSelectedFile,
  selectedFile,
  setSelectedTab,
  handleImageChange,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const openFileInput = () => {
    fileRef.current?.click();
  };
  return (
    <Box padding="15px" display="flex" flexDirection="column" maxHeight="500px">
      {selectedFile ? (
        <>
          <Box display="flex">
            <img src={selectedFile} height="100%" width="100%" />
          </Box>

          <Box
            mt="20px"
            flexGrow="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setSelectedTab('Post')}
            >
              Back to post
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setSelectedFile('')}
            >
              Remove
            </Button>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="250px"
          border="1px dashed #9e9e9e"
          borderRadius="3px"
        >
          <Button variant="outlined" color="secondary" onClick={openFileInput}>
            Upload
          </Button>
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
        </Box>
      )}
    </Box>
  );
};
export default ImageUpload;
