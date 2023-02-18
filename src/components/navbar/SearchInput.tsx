import { AccountCircle } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }} component="form">
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
