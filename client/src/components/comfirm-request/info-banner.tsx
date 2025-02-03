import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';

function InfoBanner() {
  return (
    <Stack gap={4} maxWidth="md" textAlign={'center'} sx={{ bgcolor: '#ede7f6', borderRadius: 3 }} px={2} py={4}>
      <Typography fontWeight={700} variant="caption">
        If you consent to this verification, please enter the authentication code provided to you by email in the space
        below and click 'Accept'
      </Typography>
      <Typography fontWeight={700} variant="caption">
        If you do NOT consent to this verification, please enter the authentication code provided to you by email in the
        space below and click 'Deny'
      </Typography>
    </Stack>
  );
}
export default InfoBanner;
