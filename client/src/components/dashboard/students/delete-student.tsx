import React, { useState } from 'react';
import apiService from '@/services/api.service';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Trash } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

function DeleteStudent({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { isLoading, mutate } = useMutation(async () => {
    try {
      await apiService.delete(`/api/students/${id}`);
      queryClient.invalidateQueries('students');
      toast.success('Student deleted');
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    }
  });

  const handleDelete = () => {
    mutate();
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} disabled={isLoading}>
        <Trash size={16} />
      </IconButton>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this student({id})?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteStudent;
