import { Suspense } from 'react';
import { Metadata } from 'next';
import { Box, CircularProgress, Container } from '@mui/material';

import ConfirmRequest from '@/components/comfirm-request/confirm-request';

export const metadata: Metadata = {
  title: 'Nebosh Certificate Validation',
  description: 'Nebosh Certificate Validation',
};

function Page() {
  return (
    <div>
      <Container sx={{ my: 8 }}>
        <Box component="img" src="/assets/nebosh.png" height={120} alt="NEBOSH" sx={{ mx: 'auto', display: 'block' }} />
        <Suspense fallback={<CircularProgress />}>
          <ConfirmRequest />
        </Suspense>
      </Container>
    </div>
  );
}
export default Page;
