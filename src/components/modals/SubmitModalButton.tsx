import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

type SubmitModalButtonProps = {
  loading: boolean;
  text: string;
};

const SubmitModalButton: React.FC<SubmitModalButtonProps> = ({
  loading,
  text,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: '15px' }}>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ flexGrow: '1', mx: '0', display: 'flex', alignItems: 'center' }}
      >
        {loading ? (
          <CircularProgress color="inherit" sx={{ height: '10px' }} />
        ) : (
          text
        )}
      </Button>
    </Box>
  );
};
export default SubmitModalButton;
