'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
