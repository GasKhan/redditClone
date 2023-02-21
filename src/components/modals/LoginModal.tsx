import { AuthModalState, IAuthModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import FIREBASE_ERRORS from '@/firebase/errors';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SwitchToAnotherModal from './SwitchToAnotherModal';
import SubmitModalButton from './SubmitModalButton';

const LoginModal: React.FC = () => {
  const setAuthState = useSetRecoilState(AuthModalState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginState.email, loginState.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (view: IAuthModalState['view']) => {
    setAuthState((prev) => ({
      ...prev,
      view: view,
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
        email={loginState.email}
        inputName="email"
        handleChange={handleChange}
      />
      <PasswordInput
        password={loginState.password}
        inputName="password"
        handleChange={handleChange}
      />
      <Typography color="error" align="center">
        {error &&
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Typography>
      <SubmitModalButton loading={loading} text="Log In" />
      <SwitchToAnotherModal
        handleClick={() => handleClick('resetPassword')}
        text="Forgot your password"
        linkText="RESET YOUR PASSWORD"
      />

      <SwitchToAnotherModal
        handleClick={() => handleClick('signUp')}
        text="New to Reddit?"
        linkText="SIGN UP"
      />
    </Box>
  );
};
export default LoginModal;
