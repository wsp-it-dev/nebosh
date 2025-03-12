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

import { Certificate } from '@/types/user';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string().min(1, 'Certificate number is required'),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid issue date',
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  certificate: Certificate;
}

export default function EditCertificate({ certificate }: Props) {
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      // Set default values using certificate props
      name: certificate.name,
      number: certificate.number,
      issueDate: dayjs(certificate.issueDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), // Convert date format
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  const { isLoading, mutate } = useMutation(async (formdata: FormData) => {
    try {
      await apiService.put(`/api/certificates/${params.get('id')}`, {
        ...formdata,
        issueDate: dayjs(formdata.issueDate).format('DD/MM/YYYY'),
      });
      queryClient.invalidateQueries(`certificates`);
      queryClient.invalidateQueries([`certificates`, params.get('id')]);
      toast.success('Certificate updated');
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
            label="Qualification"
            fullWidth
            variant="outlined"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Certificate No"
            fullWidth
            variant="outlined"
            {...register('number')}
            error={!!errors.number}
            helperText={errors.number?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Issue date"
            fullWidth
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...register('issueDate')}
            error={!!errors.issueDate}
            helperText={errors.issueDate?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Update
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
