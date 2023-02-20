import { AuthModalState } from '@/atoms/authModalAtom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '@/firebase/clientApp';
import CircularProgress from '@mui/material/CircularProgress';
import FIREBASE_ERRORS from '../../firebase/errors';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SwitchToAnotherModal from './SwitchToAnotherModal';
import SubmitModalButton from './SubmitModalButton';

export default function SignUpModal() {
  const setAuthState = useSetRecoilState(AuthModalState);
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [error, setError] = useState('');

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) setError('');
    if (loginState.password !== loginState.confirmPassword) {
      setError('Password is not the same!');
      return;
    }

    createUserWithEmailAndPassword(loginState.email, loginState.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setAuthState((prev) => ({
      ...prev,
      view: 'logIn',
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <EmailInput
        handleChange={handleChange}
        email={loginState.email}
        inputName="email"
      />
      <PasswordInput
        handleChange={handleChange}
        password={loginState.password}
        inputName="password"
      />
      <PasswordInput
        handleChange={handleChange}
        password={loginState.confirmPassword}
        inputName="confirmPassword"
      />

      <Typography color="error" align="center">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Typography>
      <SubmitModalButton loading={loading} text="Sign Up" />
      <SwitchToAnotherModal
        handleClick={handleClick}
        text="Already a redditor?"
        linkText="LOG IN"
      />
    </Box>
  );
}
