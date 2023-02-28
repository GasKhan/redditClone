import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/system/Box';
import CommunityCheckbox from './CommunityCheckbox';
import SubmitModalButton from './SubmitModalButton';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const CreateCommunityModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [communityName, setCommunityName] = React.useState('');
  const [communityType, setCommunityType] = React.useState('public');
  const [error, setError] = React.useState('');
  const [user, loading, e] = useAuthState(auth);
  const reg = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

  const charRemained = 21 - communityName.length;

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 21) setCommunityName(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCommunity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (reg.test(communityName) || communityName.length < 3) {
      setError(
        'Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.'
      );
      return;
    }

    try {
      const communityDocRef = doc(firestore, 'communities', communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, ${communityName} is taken. Try another.`);
        }
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityName: communityName,
            isModerator: true,
          }
        );
      });
    } catch (e: any) {
      console.log(e.message);
      setError(e.message);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{ color: '#000' }}>
        Create a new community
      </Button>
      <Dialog open={open} fullWidth maxWidth="sm">
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
        <Box component="form" onSubmit={handleCreateCommunity}>
          <DialogTitle color="#000">Create a community</DialogTitle>
          <DialogContent>
            <DialogContentText mb="20px" component="div">
              <Typography fontWeight={700} color="#000">
                Name
              </Typography>
              <Typography color="grey[500]">
                Community names including capitalization cannot be changed
              </Typography>
            </DialogContentText>
            <TextField
              onBlur={() => console.log('blur')}
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              color="secondary"
              value={communityName}
              onChange={handleNameChange}
              sx={{
                '& input': {
                  p: '8px 10px',
                },
              }}
            />
            <Typography fontSize="14px">
              {charRemained} Character remaining
            </Typography>
            <Typography color="error" fontSize="12px" mb="20px">
              {error}
            </Typography>
            <CommunityCheckbox
              checkedVal={communityType}
              handleChange={handleCheck}
            />
          </DialogContent>

          <DialogActions
            sx={{
              bgcolor: (theme) => theme.palette.grey[100],
              px: '20px',
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </Button>
            <SubmitModalButton text="Create a community" loading={loading} />
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateCommunityModal;
