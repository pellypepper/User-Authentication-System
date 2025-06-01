'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { authApi } from '@/lib/api';
import AuthForm from '@/component/AuthForm';
import LoadingSpinner from '@/component/LoadingSpinner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authApi.googleLogin();

  };

  return (
    <AuthForm title="Sign in to your account" onSubmit={handleSubmit} loading={loading}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="sr-only">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="form-input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
          Forgot your password?
        </Link>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? <LoadingSpinner /> : 'Sign in'}
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn-secondary"
        >
          Sign in with Google
        </button>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Don&#39;t have an account?{' '}
          <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Register here
          </Link>
        </span>
      </div>
    </AuthForm>
  );
}