import { Stack, Typography } from '@mui/material';

function Finished() {
  return (
    <Stack alignItems="center" gap={2} textAlign="center">
      <Typography variant="body1" fontWeight={'bold'} pb={4}>
        Thank you for your request to verify our certificate. Your request has been sent to the learner that was issued
        this certificate for authentication
      </Typography>
      <Typography variant="caption" fontWeight={'bold'}>
        Verification of this document is not complete until you have received formal verification by email,{' '}
        <b>from us</b>
      </Typography>

      <Typography variant="caption" fontWeight={'bold'}>
        An email will be sent to you within 2 working days confirming the outcome of your request.
      </Typography>

      <Typography variant="caption" fontWeight={'bold'}>
        Full information of our verification process and additional guidance on how to verify certificates is available
        on the our website.
      </Typography>
    </Stack>
  );
}
export default Finished;
