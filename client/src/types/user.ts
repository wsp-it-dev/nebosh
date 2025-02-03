export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  role?: string;

  [key: string]: unknown;
}

export interface Student {
  certId: number;
  number: string;
  name: string;
  issueDate: string;
}
