import AuthModal from '@/components/modals/AuthModal';
import React from 'react';
import AuthButtons from './AuthButtons';

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <AuthButtons />
    </>
  );
};
export default RightContent;
