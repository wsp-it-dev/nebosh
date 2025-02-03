import { Metadata } from 'next';
import { Container } from '@mui/material';

import FetchReqData from '@/components/verification-request/fetch-data';
import MultiStepForm from '@/components/verification-request/multistep-form';

export const metadata: Metadata = {
  title: 'Nebosh Certificate Validation',
  description: 'Nebosh Certificate Validation',
};

function Page() {
  return (
    <Container sx={{ my: 4 }}>
      <FetchReqData />
      <MultiStepForm />
    </Container>
  );
}
export default Page;
