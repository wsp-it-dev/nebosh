import { RootState } from '@/store';
import { Stack, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function LearnerDetails() {
  const { student } = useSelector((state: RootState) => state.verification);

  return (
    <Stack alignItems="center" gap={2}>
      <Typography textAlign="center" variant="body1" fontWeight={'bold'} pb={4}>
        To verify a certificate or parchment, please enter the following pieces of information exactly as they appear on
        the document
      </Typography>
      <form>
        <TextField label="Learner Name*" value={student?.name} variant="outlined" fullWidth margin="normal" disabled />
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
  );
}
export default LearnerDetails;
