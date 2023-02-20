import Typography from '@mui/material/Typography';
import React from 'react';

type SwitchToAnotherModalProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  linkText: string;
};

const SwitchToAnotherModal: React.FC<SwitchToAnotherModalProps> = ({
  handleClick,
  text,
  linkText,
}) => {
  return (
    <>
      <Typography fontSize={12} sx={{ cursor: 'inherit' }} align="center">
        {text}
        <Typography
          component="button"
          type="button"
          fontSize={14}
          fontWeight={600}
          color="secondary"
          onClick={handleClick}
          sx={{
            bgcolor: 'inherit',
            border: 'none',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          {linkText}
        </Typography>
      </Typography>
    </>
  );
};
export default SwitchToAnotherModal;
