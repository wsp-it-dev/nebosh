import apiService from '@/services/api.service';
import { IconButton } from '@mui/material';
import { PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

interface Props {
  id: number;
}

function RetryEmail({ id }: Props) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(async () => {
    try {
      await apiService.get(`/api/email-records/${id}/retry`);
      queryClient.invalidateQueries(`email-records`);
      toast.success('email sent');
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'something went wrong';
      toast.error(msg);
    }
  });

  return (
    <IconButton title="resend" onClick={() => mutate()} disabled={isLoading}>
      <PaperPlaneTilt size={16} />
    </IconButton>
  );
}
export default RetryEmail;
