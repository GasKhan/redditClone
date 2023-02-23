import { AuthModalState } from '@/atoms/authModalAtom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth, firestore } from '@/firebase/clientApp';
import FIREBASE_ERRORS from '../../firebase/errors';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SwitchToAnotherModal from './SwitchToAnotherModal';
import SubmitModalButton from './SubmitModalButton';
import { addDoc, collection } from 'firebase/firestore';
import { User } from 'firebase/auth';

export default function SignUpModal() {
  const setAuthState = useSetRecoilState(AuthModalState);
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [error, setError] = useState('');

  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, 'users'),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCred) createUserDocument(userCred.user);
  }, [userCred]);

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
    try {
      createUserWithEmailAndPassword(loginState.email, loginState.password);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
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
