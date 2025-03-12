'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Pencil } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { StudentData } from '@/types/user';

import DeleteStudent from './delete-student';

interface Props {
  data: StudentData[];
}

function StudentsGrid({ data }: Props) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/students/edit?id=${id}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      width: 180,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      valueFormatter: (params) => dayjs(params).format('MMM D, YYYY'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <Pencil size={16} />
          </IconButton>
          <DeleteStudent id={params.row.id} />
        </Box>
      ),
    },
  ];

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Divider />
    </Card>
  );
}

export default StudentsGrid;
