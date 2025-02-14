'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Pencil, Trash } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { StudentData } from '@/types/user';

import DeleteStudent from './delete-student';

interface Props {
  data: StudentData[];
}

function StudentsGrid({ data }: Props) {
  const handleEdit = (id: string) => {
    console.log('Editing student with ID:', id);
    // Add your edit logic here
  };

  const handleDelete = (id: string) => {
    console.log('Deleting student with ID:', id);
    // Add your delete logic here
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
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Divider />
    </Card>
  );
}

export default StudentsGrid;
