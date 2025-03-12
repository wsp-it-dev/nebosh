'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import apiService from '@/services/api.service';
import { LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';

import { StudentData } from '@/types/user';
import EditStudentForm from '@/components/dashboard/students/edit-student-form';

export default function Page(): React.JSX.Element {
  const params = useSearchParams();
  const { data, isLoading } = useQuery(['students', params.get('id')], async () => {
    interface Resp {
      data: {
        student: StudentData;
      };
    }
    const { data }: Resp = await apiService.get(`/api/students/${params.get('id')}`);
    return data.student;
  });

  if (isLoading || !data) return <LinearProgress />;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Edit {data?.name}</Typography>
      <EditStudentForm student={data} />
    </Stack>
  );
}
