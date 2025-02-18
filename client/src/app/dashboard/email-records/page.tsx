'use client';

import * as React from 'react';
import apiService from '@/services/api.service';
import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';

import { EmailRecord } from '@/types/user';
import EmailsList from '@/components/dashboard/email-records/emails-list';

export default function Page(): React.JSX.Element {
  const { data } = useQuery('email-records', async () => {
    interface Resp {
      data: {
        emails: EmailRecord[];
      };
    }
    const res: Resp = await apiService.get('/api/email-records');
    return res.data.emails;
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Verification Requests</Typography>
        </Stack>
      </Stack>
      {data ? <EmailsList data={data} /> : <CircularProgress />}
    </Stack>
  );
}
