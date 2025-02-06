import * as React from 'react';
import apiService from '@/services/api.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { StudentData } from '@/types/user';

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
  number: z.string().min(1, 'Certificate number is required'),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid issue date',
  }),
  StudentId: z.number().min(1, 'Student id is required'),
});

type FormData = z.infer<typeof schema>;

export default function AddCertificate() {
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
      await apiService.post(`/api/certificates`, {
        ...formdata,
        issueDate: dayjs(formdata.issueDate).format('DD/MM/YYYY'),
      });
      queryClient.invalidateQueries(`certificates`);
      toast.success('Certificate added');
      reset();
      handleClose();
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'something went wrong';
      toast.error(msg);
      throw Error(msg);
    }
  });

  const { data: students } = useQuery('students', async () => {
    interface Resp {
      data: {
        students: StudentData[];
      };
    }
    const res: Resp = await apiService.get('/api/students');
    return res.data.students;
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
            Add Certificate
          </Typography>

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
                <FormControl fullWidth variant="outlined" error={!!errors.number}>
                  <InputLabel>Student</InputLabel>
                  <Select
                    label="Certificate No"
                    {...register('StudentId')}
                    defaultValue="" // Ensures that an unselected value is an empty string
                  >
                    <MenuItem value="">Select a student</MenuItem>
                    {students &&
                      students.map((student) => (
                        <MenuItem key={student.id} value={student.id}>
                          {student.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{errors.StudentId?.message}</FormHelperText>
                </FormControl>
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
