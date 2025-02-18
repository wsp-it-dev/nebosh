'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EmailsList from '@/components/dashboard/email-records/emails-list';

export default function Page() {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Email Records</Typography>
        </Stack>
      </Stack>
      <EmailsList />
    </Stack>
  );
}
