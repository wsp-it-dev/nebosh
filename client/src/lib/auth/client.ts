'use client';

import apiService from '@/services/api.service';
import Cookies from 'js-cookie';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const { email, password } = params;

      // Make API request
      const { data } = await apiService.post('/api/admin/login', { email, password });

      // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
      if (!data?.token) {
        return { error: 'Invalid credentials' };
      }

      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
      return {};
    } catch (e) {
      return { error: 'Invalid credentials' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = Cookies.get('token');

    if (!token) {
      return { data: null };
    }

    const user = JSON.parse(Cookies.get('user') as string) as User;

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    Cookies.remove('user');
    Cookies.remove('token');

    return {};
  }
}

export const authClient = new AuthClient();
