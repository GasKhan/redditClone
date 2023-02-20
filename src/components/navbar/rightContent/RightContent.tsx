import AuthModal from '@/components/modals/AuthModal';
import { auth } from '@/firebase/clientApp';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import React from 'react';
import AuthButtons from './AuthButtons';

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      {user ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => signOut(auth)}
        >
          Log out
        </Button>
      ) : (
        <AuthButtons />
      )}
    </>
  );
};
export default RightContent;
