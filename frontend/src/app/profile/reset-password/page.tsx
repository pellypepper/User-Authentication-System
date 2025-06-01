'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';
import AuthForm from '@/component/AuthForm';
import LoadingSpinner from '@/component/LoadingSpinner';

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(decodeURIComponent(emailParam));
    } else {
      setError('Invalid reset link');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!token || !email) {
      setError('Invalid reset link');
      setLoading(false);
      return;
    }

    try {
      await authApi.resetPassword({
        email,
        token,
        newPassword: formData.newPassword
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Password Reset Successful!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your password has been reset successfully. Redirecting to login page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthForm title="Set new password" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          Enter your new password below.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="newPassword" className="sr-only">New Password</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          className="form-input"
          placeholder="New password"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="form-input"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? <LoadingSpinner /> : 'Reset Password'}
        </button>
      </div>
    </AuthForm>
  );
}