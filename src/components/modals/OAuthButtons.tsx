import { Avatar, Box, Button } from '@mui/material';

const OAuthButtons: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          width: '100%',
          m: '7px 0',
          fontWeight: '600',
          bgcolor: '#fafafa',
          borderColor: (theme) => theme.palette.grey[500],
          outlineColor: 'secondary',
          color: (theme) => theme.palette.grey[500],
          '&:hover': {
            bgcolor: 'inherit',
            borderColor: (theme) => theme.palette.grey[500],
          },
        }}
      >
        <Avatar
          src="./images/googlelogo.png"
          sx={{
            height: '24px',
            width: '24px',
            objectFit: 'contain',
            mr: '40px',
          }}
        />
        Continue with Google
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          width: '100%',
          m: '9px 0',
          fontWeight: '600',
          bgcolor: '#fafafa',
          borderColor: (theme) => theme.palette.grey[500],
          outlineColor: 'secondary',
          color: (theme) => theme.palette.grey[500],
          '&:hover': {
            bgcolor: 'inherit',
            borderColor: (theme) => theme.palette.grey[500],
          },
        }}
      >
        Continue with ...
      </Button>
    </Box>
  );
};
export default OAuthButtons;
