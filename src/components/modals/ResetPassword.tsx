import { AuthModalState, IAuthModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import EmailInput from './EmailInput';
import SubmitModalButton from './SubmitModalButton';

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState('');
  const setAuthState = useSetRecoilState(AuthModalState);
  const [success, setSuccess] = useState(false);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClick = (view: IAuthModalState['view']) => {
    setAuthState((prev) => ({
      ...prev,
      view: view,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return success ? (
    <Typography>Check your email</Typography>
  ) : (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography align="center" color="#9e9e9e">
        {' '}
        Enter the email associated with your account and we'll send you a reset
        link
      </Typography>
      <EmailInput inputName="email" handleChange={handleChange} email={email} />
      <SubmitModalButton loading={false} text="Reset Password" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          component="button"
          type="button"
          fontSize={14}
          fontWeight={600}
          color="secondary"
          onClick={() => handleClick('logIn')}
          sx={{
            mr: '20px',
            bgcolor: 'inherit',
            border: 'none',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          LOG IN
        </Typography>
        <Typography
          component="button"
          type="button"
          fontSize={14}
          fontWeight={600}
          color="secondary"
          onClick={() => handleClick('signUp')}
          sx={{
            bgcolor: 'inherit',
            border: 'none',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          SIGN UP
        </Typography>
      </Box>
    </Box>
  );
};
export default ResetPassword;
