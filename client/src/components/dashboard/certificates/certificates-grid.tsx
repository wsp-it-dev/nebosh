'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { FilePdf, Pencil, Trash } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { Certificate } from '@/types/user';
import { printAndDownload } from '@/lib/certificate';

interface Props {
  data: Certificate[];
}

function CertificatesGrid({ data }: Props) {
  const handleEdit = (id: string) => {
    console.log('Editing student with ID:', id);
    // Add your edit logic here
  };

  const handleDelete = (id: string) => {
    console.log('Deleting student with ID:', id);
    // Add your delete logic here
  };

  const columns: GridColDef[] = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   width: 80,
    // },
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
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <Trash size={16} />
          </IconButton>
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

export default CertificatesGrid;
