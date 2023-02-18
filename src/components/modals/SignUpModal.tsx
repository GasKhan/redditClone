import { AuthModalState } from '@/atoms/authModalAtom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

export default function SignUpModal() {
  const setAuthState = useSetRecoilState(AuthModalState);

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <OutlinedInput
        value={loginState.email}
        required
        name="email"
        type="email"
        placeholder="email"
        color="secondary"
        onChange={handleChange}
        sx={{
          mb: '5px',
          fontSize: '10px',
          bgcolor: (theme) => theme.palette.grey[50],
          '& input': {
            py: '9px',
          },
        }}
      />
      <OutlinedInput
        value={loginState.password}
        required
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
        color="secondary"
        sx={{
          mb: '5px',
          fontSize: '10px',
          bgcolor: (theme) => theme.palette.grey[50],
          '& input': {
            py: '9px',
          },
        }}
      />
      <OutlinedInput
        value={loginState.confirmPassword}
        required
        name="confirmPassword"
        type="password"
        placeholder="confirm password"
        onChange={handleChange}
        color="secondary"
        sx={{
          mb: '5px',
          fontSize: '10px',
          bgcolor: (theme) => theme.palette.grey[50],
          '& input': {
            py: '9px',
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', my: '15px' }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ flexGrow: '1', mx: '0' }}
        >
          Sign Up
        </Button>
      </Box>
      <Typography fontSize={12} sx={{ cursor: 'inherit' }} align="center">
        Already a redditor?{' '}
        <Typography
          component="button"
          fontSize={14}
          fontWeight={600}
          color="secondary"
          onClick={handleClick}
          sx={{
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
      </Typography>
    </Box>
  );
}
