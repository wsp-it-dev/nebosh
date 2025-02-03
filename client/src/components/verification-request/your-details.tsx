import { useEffect } from 'react';
import { RootState } from '@/store';
import { setActiveStep, updateNextDisable, updateUser } from '@/store/verification.slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import Footer from './footer';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  organization: z.string().min(1, { message: 'Organisation is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormData = z.infer<typeof schema>;

function YourDetails() {
  const { user, activeStep } = useSelector((state: RootState) => state.verification);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: user,
    resolver: zodResolver(schema),
  });

  // Form submission handler
  const onSubmit = (data: FormData) => {
    dispatch(updateUser(data));
    dispatch(setActiveStep(activeStep + 1));
  };

  useEffect(() => {
    dispatch(updateNextDisable(true));
  }, []);

  return (
    <>
      <Stack alignItems="center" gap={2}>
        <Typography variant="body1" fontWeight={'bold'} pb={4}>
          Your Details
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Name*"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="organization"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Organisation*"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.organization}
                helperText={errors.organization?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Email*"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Next
          </Button>
        </form>
      </Stack>
      <Footer label="" />
    </>
  );
}
export default YourDetails;
