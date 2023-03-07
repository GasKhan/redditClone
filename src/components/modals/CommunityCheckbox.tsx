import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';
import Box from '@mui/system/Box';

type CommunityCheckboxProps = {
  checkedVal: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CommunityCheckbox: React.FC<CommunityCheckboxProps> = ({
  checkedVal,
  handleChange,
}) => {
  return (
    <FormControl>
      <FormLabel
        id="demo-radio-buttons-group-label"
        color="secondary"
        sx={{ fontWeight: '700', color: '#000' }}
      >
        Community types
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        color="secondary"
      >
        <Box display="flex" alignItems="center">
          <FormControlLabel
            value="public"
            checked={checkedVal === 'public'}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            control={<Radio color="secondary" />}
            label="Public"
            sx={{
              '& span': {
                fontWeight: 'bold',
              },
            }}
          />
          <Typography fontSize="12px">
            Anyone can view, post and comment to this community
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            value="restricted"
            checked={checkedVal === 'restricted'}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            control={<Radio color="secondary" />}
            label="Restricted"
            sx={{
              '& span': {
                fontWeight: 'bold',
              },
            }}
          />
          <Typography fontSize="12px">
            Anyone can view, post and comment to this community
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            value="private"
            checked={checkedVal === 'private'}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            control={<Radio color="secondary" />}
            label="Private"
            sx={{
              '& span': {
                fontWeight: 'bold',
              },
            }}
          />
          <Typography fontSize="12px">
            Anyone can view, post and comment to this community
          </Typography>
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

export default CommunityCheckbox;
