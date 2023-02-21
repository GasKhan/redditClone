import AuthModal from '@/components/modals/AuthModal';
import { auth } from '@/firebase/clientApp';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import AuthButtons from './AuthButtons';
import DropDownMenu from './DropDownMenu';
import Icons from './Icons';

type RightContentProps = {
  user: User;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      {user ? <Icons /> : <AuthButtons />}
      <DropDownMenu user={user} />
    </>
  );
};
export default RightContent;
