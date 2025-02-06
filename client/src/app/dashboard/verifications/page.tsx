'use client';

import * as React from 'react';
import apiService from '@/services/api.service';
import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';

import { VerificationRequest } from '@/types/user';
import ListVerifications from '@/components/dashboard/verifications/list-verifications';

export default function Page(): React.JSX.Element {
  const { data } = useQuery('verifications', async () => {
    interface Resp {
      data: {
        requests: VerificationRequest[];
      };
    }
    const res: Resp = await apiService.get('/api/verifications');
    return res.data.requests;
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Verification Requests</Typography>
        </Stack>
      </Stack>
      {data ? <ListVerifications data={data} /> : <CircularProgress />}
    </Stack>
  );
}
