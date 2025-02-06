'use client';

import * as React from 'react';
import apiService from '@/services/api.service';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useQuery } from 'react-query';

import { StudentData } from '@/types/user';
import StudentsGrid from '@/components/dashboard/students/students-grid';

export default function Page(): React.JSX.Element {
  const { data } = useQuery('students', async () => {
    interface Resp {
      data: {
        students: StudentData[];
      };
    }
    const { data }: Resp = await apiService.get('/api/students');
    return data.students;
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Students</Typography>
          {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack> */}
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      {data ? <StudentsGrid data={data} /> : <CircularProgress />}
    </Stack>
  );
}
