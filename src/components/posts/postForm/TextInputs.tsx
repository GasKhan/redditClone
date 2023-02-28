import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';

type TextInputsProps = {
  loading: boolean;
  postValue: {
    title: string;
    body: string;
  };
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const TextInputs: React.FC<TextInputsProps> = ({
  postValue,
  handleTextChange,
  handlePostSubmit,
  loading,
}) => {
  return (
    <Stack p="15px 20px">
      <TextField
        name="title"
        placeholder="Title"
        variant="outlined"
        color="secondary"
        value={postValue.title}
        onChange={handleTextChange}
        sx={{
          mb: '15px',
          '& input': {
            p: '12px 14px',
          },
        }}
      />
      <TextField
        name="body"
        placeholder="Text (optional)"
        variant="outlined"
        color="secondary"
        value={postValue.body}
        onChange={handleTextChange}
        sx={{ mb: '15px' }}
        multiline
        minRows="4"
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          sx={{ px: '25px' }}
          onClick={handlePostSubmit}
          disabled={loading}
        >
          Post
        </Button>
      </Box>
    </Stack>
  );
};
export default TextInputs;
