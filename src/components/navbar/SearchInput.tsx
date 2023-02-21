import { AccountCircle } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { User } from 'firebase/auth';

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Box
      display="flex"
      flexGrow="1"
      sx={{ maxWidth: user ? 'auto' : '600px' }}
      component="form"
    >
      <TextField
        placeholder="Search Reddit"
        variant="outlined"
        size="small"
        fullWidth
        color="secondary"
        sx={{
          mx: '10px',
          bgcolor: '#fafafa',
          '&:hover': {
            bgcolor: '#fff',
          },
          '& input': {
            py: '9px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
export default SearchInput;
