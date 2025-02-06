'use client';

import * as React from 'react';
import apiService from '@/services/api.service';
import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';

import { Certificate } from '@/types/user';
import AddCertificate from '@/components/dashboard/certificates/add-certificate';
import CertificatesGrid from '@/components/dashboard/certificates/certificates-grid';

export default function Page(): React.JSX.Element {
  const { data } = useQuery('certificates', async () => {
    interface Resp {
      data: {
        certificates: Certificate[];
      };
    }
    const { data }: Resp = await apiService.get('/api/certificates');
    return data.certificates;
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Certificates</Typography>
        </Stack>
        <div>
          <AddCertificate />
        </div>
      </Stack>
      {data ? <CertificatesGrid data={data} /> : <CircularProgress />}
    </Stack>
  );
}
