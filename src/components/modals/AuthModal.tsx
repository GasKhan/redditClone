import { AuthModalState } from '@/atoms/authModalAtom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useRecoilState } from 'recoil';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import OAuthButtons from './OAuthButtons';
import { Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { useEffect } from 'react';
import ResetPassword from './ResetPassword';
import Box from '@mui/system/Box';

const AuthModal: React.FC = () => {
  const [{ isOpen, view }, setAuthModalState] = useRecoilState(AuthModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle align="center">
          {view === 'logIn' && 'Log In'}
          {view === 'signUp' && 'Sign Up'}
          {view === 'resetPassword' && 'Reset Password'}
        </DialogTitle>
        <DialogContent>
          {view === 'resetPassword' ? (
            <ResetPassword />
          ) : (
            <Box>
              <OAuthButtons />
              <Typography margin="15px" align="center">
                OR
              </Typography>
              {view === 'logIn' && <LoginModal />}
              {view === 'signUp' && <SignUpModal />}
            </Box>
          )}
        </DialogContent>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  );
};
export default AuthModal;
