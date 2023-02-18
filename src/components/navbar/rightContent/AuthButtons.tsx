import { AuthModalState, view } from '@/atoms/authModalAtom';
import Button from '@mui/material/Button';
import { useSetRecoilState } from 'recoil';

const AuthButtons: React.FC = () => {
  const setIsOpen = useSetRecoilState(AuthModalState);

  function handleOpen(view: view) {
    setIsOpen((prev) => ({
      view: view,
      isOpen: !prev.isOpen,
    }));
  }

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
          width: {
            sm: '70px',
            md: '110px',
          },
        }}
        onClick={() => handleOpen('logIn')}
      >
        Log in
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
          width: {
            sm: '70px',
            md: '110px',
          },
        }}
        onClick={() => handleOpen('signUp')}
      >
        Sign up
      </Button>
    </>
  );
};
export default AuthButtons;
