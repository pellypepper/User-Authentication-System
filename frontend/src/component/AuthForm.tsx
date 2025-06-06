'use client';

import { ReactNode } from 'react';

interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  loading?: boolean;
}

export default function AuthForm({ title, onSubmit, children, loading = false }: AuthFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            {children}
          </div>
        </form>
      </div>
    </div>
  );
}
