import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Student } from '@/types/user';

interface User {
  name: string;
  organization: string;
  email: string;
}

interface State {
  nextDisabled: boolean;
  activeStep: number;
  student: Student | null;
  user: User;
}

const initialState: State = {
  nextDisabled: true,
  activeStep: 0,
  student: null,
  user: {
    name: '',
    organization: '',
    email: '',
  },
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    updateNextDisable: (state, action: PayloadAction<boolean>) => {
      state.nextDisabled = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.nextDisabled = false;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      state.student = action.payload;
    },
  },
});

export const { updateNextDisable, setActiveStep, updateUser, updateStudent } = verificationSlice.actions;

export default verificationSlice.reducer;
