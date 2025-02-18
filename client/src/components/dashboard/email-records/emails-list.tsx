'use client';

import apiService from '@/services/api.service';
import { Chip, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useQuery } from 'react-query';

import { EmailRecord } from '@/types/user';

import RetryEmail from './retry-email';

function EmailsList() {
  const { data, isLoading } = useQuery('email-records', async () => {
    interface Resp {
      data: {
        emails: EmailRecord[];
      };
    }
    const res: Resp = await apiService.get('/api/email-records');
    return res.data.emails;
  });

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
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => <RetryEmail id={params.row.id} />,
    },
  ];

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={isLoading}
          rows={data || []}
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
