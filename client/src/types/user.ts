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

export interface StudentData {
  id: number;
  name: string;
  email: string;
  dob: string;
  createdAt: Date;
}

export interface Certificate {
  id: string;
  name: string;
  number: string;
  issueDate: string;
  publish: boolean;
  ident: string;
  createdAt: Date;
  StudentId: number;
  student: Student;
}

export interface VerificationRequest {
  id: number;
  name: string;
  email: string;
  organization: string;
  requestTime: Date;
  authCode: string;
  status: string;
  ident: string;
  createdAt: string;
  CertificateId: number;
  Certificate: Certificate;
}
