import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';

type EmailInputProps = {
  email: string;
  inputName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const inputStyles = {
  mb: '5px',
  fontSize: '10px',
  bgcolor: '#fafafa',
  '& input': {
    py: '9px',
  },
};

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  handleChange,
  inputName,
}) => {
  return (
    <>
      <OutlinedInput
        value={email}
        required
        name={inputName}
        type="email"
        placeholder="email"
        color="secondary"
        onChange={handleChange}
        sx={inputStyles}
      />
    </>
  );
};
export default EmailInput;
