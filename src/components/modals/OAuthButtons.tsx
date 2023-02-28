import { auth, firestore } from '@/firebase/clientApp';
import FIREBASE_ERRORS from '@/firebase/errors';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) createUserDocument(userCred.user);
  }, [userCred]);

  return (
    <Box display="flex" flexDirection="column">
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => signInWithGoogle()}
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
      {error && (
        <Typography>
          {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
        </Typography>
      )}
    </Box>
  );
};
export default OAuthButtons;
