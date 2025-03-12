'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import apiService from '@/services/api.service';
import { LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';

import { Certificate } from '@/types/user';
import EditCertificate from '@/components/dashboard/certificates/edit-certificate';

export default function Page(): React.JSX.Element {
  const params = useSearchParams();
  const { data, isLoading } = useQuery(['certificates', params.get('id')], async () => {
    interface Resp {
      data: {
        certificate: Certificate;
      };
    }
    const { data }: Resp = await apiService.get(`/api/certificates/${params.get('id')}`);
    return data.certificate;
  });

  if (isLoading || !data) {
    return <LinearProgress />;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Edit {data.number}</Typography>
      <EditCertificate certificate={data} />
    </Stack>
  );
}
