import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';

type PasswordInputProps = {
  password: string;
  inputName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const inputStyles = {
  display: 'flex',
  flexGrow: '1',
  mb: '5px',
  fontSize: '10px',
  bgcolor: '#fafafa',
  '& input': {
    py: '9px',
  },
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  inputName,
  handleChange,
}) => {
  return (
    <>
      <OutlinedInput
        value={password}
        required
        name={inputName}
        type="password"
        placeholder="password"
        onChange={handleChange}
        color="secondary"
        sx={inputStyles}
      />
    </>
  );
};
export default PasswordInput;
