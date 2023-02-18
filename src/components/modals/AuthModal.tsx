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

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [{ isOpen, view }, setAuthModalState] = useRecoilState(AuthModalState);

  const handleClose = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle align="center">
          {view === 'logIn' && 'Log In'}
          {view === 'signUp' && 'Sign Up'}
          {view === 'resetPassword' && 'Reset Password'}
        </DialogTitle>
        <DialogContent>
          <OAuthButtons />
          <Typography margin="15px" align="center">
            OR
          </Typography>
          {view === 'logIn' && <LoginModal />}
          {view === 'signUp' && <SignUpModal />}
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
