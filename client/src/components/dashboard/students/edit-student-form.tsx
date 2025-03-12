import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import apiService from '@/services/api.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { StudentData } from '@/types/user';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date of birth',
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  student: StudentData;
}

export default function EditStudentForm({ student }: Props) {
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      // Set default values using student props
      name: student.name,
      email: student.email,
      dob: dayjs(student.dob, 'DD/MM/YYYY').format('YYYY-MM-DD'), // Convert date format
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  const { isLoading, mutate } = useMutation(async (formdata: FormData) => {
    try {
      await apiService.put(`/api/students/${params.get('id')}`, {
        ...formdata,
        dob: dayjs(formdata.dob).format('DD/MM/YYYY'),
      });
      queryClient.invalidateQueries(`students`);
      queryClient.invalidateQueries(['students', params.get('id')]);
      toast.success('student updated');
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'something went wrong';
      toast.error(msg);
      throw Error(msg);
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date of Birth"
            fullWidth
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...register('dob')}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
