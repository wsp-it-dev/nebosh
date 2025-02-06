import * as React from 'react';
import apiService from '@/services/api.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date of birth',
  }),
});

type FormData = z.infer<typeof schema>;

export default function AddStudent() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  const { isLoading, mutate } = useMutation(async (formdata: FormData) => {
    try {
      await apiService.post(`/api/students`, {
        ...formdata,
        dob: dayjs(formdata.dob).format('DD/MM/YYYY'),
      });
      queryClient.invalidateQueries(`students`);
      toast.success('student added');
      reset();
      handleClose();
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'something went wrong';
      toast.error(msg);
      throw Error(msg);
    }
  });

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" mb={4}>
            Add new student
          </Typography>

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
        </Box>
      </Modal>
    </div>
  );
}
