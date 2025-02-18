export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    students: '/dashboard/students',
    certificates: '/dashboard/certificates',
    verifications: '/dashboard/verifications',
    emailRecords: '/dashboard/email-records',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
