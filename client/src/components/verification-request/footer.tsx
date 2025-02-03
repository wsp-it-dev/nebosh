import * as React from 'react';
import { RootState } from '@/store';
import { setActiveStep } from '@/store/verification.slice';
import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  label: string;
  onClick?: () => void;
}

function Footer({ label, onClick }: Props) {
  const { nextDisabled, activeStep } = useSelector((state: RootState) => state.verification);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (onClick) {
      onClick();
    } else {
      dispatch(setActiveStep(activeStep + 1));
    }
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  return (
    <Stack component="footer" mt={4} direction="row" justifyContent={'space-between'}>
      <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Button onClick={handleNext} disabled={nextDisabled}>
        {label}
      </Button>
    </Stack>
  );
}
export default Footer;
