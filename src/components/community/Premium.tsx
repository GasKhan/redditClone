import { Box, Button, Stack, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

const Premium: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="white"
      borderRadius="4px"
      sx={{ cursor: 'pointer' }}
      p="12px"
      border="1px solid"
      borderColor="#eee"
    >
      <Box display="flex" mb={2}>
        <SecurityIcon sx={{ height: '26px', fill: '#ff4300', mt: '5px' }} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Typography fontWeight={600}>Reddit Premium</Typography>
          <Typography>
            The best Reddit experience, with monthly Coins
          </Typography>
        </Stack>
      </Box>
      <Button variant="contained" sx={{ height: '30px' }} color="primary">
        Try Now
      </Button>
    </Box>
  );
};
export default Premium;
