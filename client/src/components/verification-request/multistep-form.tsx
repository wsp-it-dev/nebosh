'use client';

import * as React from 'react';
import { RootState } from '@/store';
import { setActiveStep } from '@/store/verification.slice';
import { Container, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useDispatch, useSelector } from 'react-redux';

import Disclaimer from './Disclaimer';
import Finished from './finished';
import LearnerDetails from './learner-details';
import YourDetails from './your-details';

const steps = [
  {
    label: 'Disclaimer',
    component: <Disclaimer />,
  },
  {
    label: 'Your Details',
    component: <YourDetails />,
  },
  {
    label: 'Learner Details',
    component: <LearnerDetails />,
  },
  {
    label: 'Finished',
    component: <Finished />,
  },
];

export default function MultiStepForm() {
  const { nextDisabled, activeStep } = useSelector((state: RootState) => state.verification);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleReset = () => {
    dispatch(setActiveStep(0));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <Container maxWidth="sm">
          <Box my={8}>{steps[activeStep].component}</Box>
          <Stack direction="row" justifyContent={'space-between'}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={nextDisabled}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Stack>
        </Container>
      )}
    </Box>
  );
}
