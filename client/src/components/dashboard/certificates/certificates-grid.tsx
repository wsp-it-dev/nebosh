'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FilePdf, Pencil } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { Certificate } from '@/types/user';
import { printAndDownload } from '@/lib/certificate';

import DeleteCert from './delete-cert';

interface Props {
  data: Certificate[];
}

function CertificatesGrid({ data }: Props) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/certificates/edit?id=${id}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'number',
      headerName: 'Certificate No',
      width: 200,
    },
    {
      field: 'name',
      headerName: 'Qualification',
      width: 200,
    },
    {
      field: 'student',
      headerName: 'Student',
      width: 200,
      renderCell: (params) => params.row.Student.name,
    },
    {
      field: 'issueDate',
      headerName: 'Issue date',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      valueFormatter: (params) => dayjs(params).format('MMM D, YYYY'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              printAndDownload({
                certNo: params.row.number,
                ident: params.row.ident,
                courseName: params.row.name,
                studentName: params.row.Student.name,
                issueDate: params.row.issueDate,
              });
            }}
          >
            <FilePdf size={16} />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <Pencil size={16} />
          </IconButton>
          <DeleteCert id={params.row.id} />
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

export default CertificatesGrid;
