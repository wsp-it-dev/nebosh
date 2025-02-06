'use client';

import * as React from 'react';
import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FilePdf, Pencil, Trash } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { VerificationRequest } from '@/types/user';

interface Props {
  data: VerificationRequest[];
}

function ListVerifications({ data }: Props) {
  const columns: GridColDef[] = [
    {
      field: 'Certificate No',
      headerName: 'Certificate',
      width: 200,
      renderCell: (params) => params.row.Certificate.number,
    },
    {
      field: 'name',
      headerName: 'Requester name',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Requester email',
      width: 200,
    },
    {
      field: 'organization',
      headerName: 'Requester organisation',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        if (params.row.status === 'completed') {
          return <Chip label={params.row.status} color="success" variant="outlined" size="small" />;
        } else if (params.row.status === 'rejected') {
          return <Chip label={params.row.status} color="error" variant="outlined" size="small" />;
        } else {
          return <Chip label={params.row.status} color="warning" variant="outlined" size="small" />;
        }
      },
    },
    {
      field: 'requestTime',
      headerName: 'Timestamp',
      width: 200,
      valueFormatter: (value) => dayjs(value).format('DD/MM/YYYY hh:mm A'),
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
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
      <Divider />
    </Card>
  );
}

export default ListVerifications;
