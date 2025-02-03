'use client';

import { useSearchParams } from 'next/navigation';
import apiService, { VerificationIdent } from '@/services/api.service';
import { Box, CircularProgress, Stack } from '@mui/material';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import DetailsRequested from './details-requested';
import InfoBanner from './info-banner';
import RequesterDetails from './requester-details';
import Verification from './verification';

function ConfirmRequest() {
  const searchParams = useSearchParams();
  const ident = searchParams.get('ident');
  const { isLoading, data, error, isSuccess } = useQuery(
    `verification-with-ident/${ident}`,
    async () => {
      try {
        const response: AxiosResponse = await apiService.get(`/api/verifications/verification-with-ident/${ident}`);
        return response.data.data;
      } catch (e: any) {
        const msg = e?.response?.data?.message || 'something went wrong';
        toast.error(msg);
        throw Error(msg);
      }
    },
    {
      enabled: Boolean(ident && searchParams.get('hash')),
      staleTime: Infinity, // No refetching, data is "fresh" forever
      cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
    }
  );

  return (
    <Box py={8}>
      <Stack alignItems="center">
        {isLoading && <CircularProgress />}
        {isSuccess && data && (
          <Stack gap={8}>
            <DetailsRequested data={data} />
            <RequesterDetails data={data} />
            <InfoBanner />
            <Verification requestID={data.request.id} />
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
export default ConfirmRequest;

interface AxiosResponse {
  data: {
    data: VerificationIdent;
  };
}
