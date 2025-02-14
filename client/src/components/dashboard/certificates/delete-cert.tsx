import apiService from '@/services/api.service';
import { IconButton } from '@mui/material';
import { Trash } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

function DeleteCert({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(async () => {
    await apiService.delete(`/api/certificates/${id}`);
    queryClient.invalidateQueries(`certificates`);
    toast.success('certificate deleted');
    try {
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'something went wrong';
      toast.error(msg);
    }
  });

  return (
    <IconButton onClick={() => mutate()} disabled={isLoading}>
      <Trash size={16} />
    </IconButton>
  );
}
export default DeleteCert;
