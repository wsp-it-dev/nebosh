'use client';

import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import moment from 'moment';

import { EmailRecord } from '@/types/user';

interface Props {
  data: EmailRecord[];
}

function EmailsList({ data }: Props) {
  const columns: GridColDef[] = [
    {
      field: 'CertValidationRequestId',
      headerName: 'Request ID',
      width: 100,
    },
    {
      field: 'email',
      headerName: 'email',
      width: 250,
    },
    {
      field: 'subject',
      headerName: 'Subject',
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Date',
      width: 200,
      valueFormatter: (val) => moment(val).format('DD MMM YYYY hh:mm A'),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        if (params.row.status === 'sent') {
          return <Chip label={params.row.status} color="success" size="small" />;
        } else if (params.row.status === 'failed') {
          return <Chip label={params.row.status} color="error" size="small" />;
        } else {
          return <Chip label={params.row.status} color="warning" size="small" />;
        }
      },
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
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
      <Divider />
    </Card>
  );
}

export default EmailsList;
