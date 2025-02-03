import { useState } from 'react';
import apiService from '@/services/api.service';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Check, XCircle } from '@phosphor-icons/react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface Props {
  requestID: number;
}
type Choice = 'accept' | 'reject';

function Verification({ requestID }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { isLoading, mutate } = useMutation(async (choice: Choice) => {
    if (!code || code.length < 4) {
      return setError('auth code is required');
    }
    const payload = {
      authCode: code,
    };

    // send request accept/reject
    try {
      if (choice === 'accept') {
        await apiService.post(`/api/verifications/${requestID}/confirm-verification`, payload);
        toast.success('verification request accepted');
      } else {
        await apiService.post(`/api/verifications/${requestID}/reject-verification`, payload);
        toast.success('verification request rejected');
      }
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'something went wrong';
      toast.error(msg);
      throw Error(msg);
    }
  });

  return (
    <Stack direction={'row'} gap={2}>
      <TextField
        label="Auth Code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setError('');
        }}
        error={Boolean(error)}
        helperText={error}
      />
      <Stack gap={1}>
        <LoadingButton
          loading={isLoading}
          size="small"
          variant="outlined"
          color="error"
          startIcon={<XCircle size={16} />}
          onClick={() => mutate('reject')}
        >
          Deny
        </LoadingButton>
        <LoadingButton
          loading={isLoading}
          size="small"
          variant="outlined"
          color="success"
          startIcon={<Check size={16} />}
          onClick={() => mutate('accept')}
        >
          Accept
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
export default Verification;
