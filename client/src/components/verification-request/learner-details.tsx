import apiService from '@/services/api.service';
import { RootState } from '@/store';
import { setActiveStep, updateNextDisable } from '@/store/verification.slice';
import { Stack, TextField, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Footer from './footer';

function LearnerDetails() {
  const { student, user, activeStep } = useSelector((state: RootState) => state.verification);
  const dispatch = useDispatch();

  const submitRequest = useMutation(async () => {
    try {
      if (student) {
        dispatch(updateNextDisable(true));
        await apiService.post(`/api/verifications?certificate_id=${student.certId}`, {
          email: user.email,
          name: user.name,
          organization: user.organization,
          requestTime: new Date().toString(),
        });
        toast.success('verification request is processing');
        dispatch(setActiveStep(activeStep + 1));
      }
    } catch (e) {
      toast.error('something went wrong please try again later');
    } finally {
      dispatch(updateNextDisable(false));
    }
  });

  return (
    <>
      <Stack alignItems="center" gap={2}>
        <Typography textAlign="center" variant="body1" fontWeight={'bold'} pb={4}>
          To verify a certificate or parchment, please enter the following pieces of information exactly as they appear
          on the document
        </Typography>
        <form>
          <TextField
            label="Learner Name*"
            value={student?.name}
            variant="outlined"
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Certificate Master Log No*"
            value={student?.number}
            variant="outlined"
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Date of achievement"
            value={student?.issueDate}
            variant="outlined"
            fullWidth
            margin="normal"
            helperText="dd/mm/yyyy"
            disabled
          />
        </form>
      </Stack>
      <Footer label="Send Request" onClick={submitRequest.mutate} />
    </>
  );
}
export default LearnerDetails;
