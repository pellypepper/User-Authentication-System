'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Auth App
          </h1>
          
          {user ? (
            <div className="space-y-6">
              <p className="text-xl text-gray-600">
                Hello, {user.firstname} {user.lastname}!
              </p>
              <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                <div className="space-y-2 text-left">
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p>
                    <span className="font-medium">Verified:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      user.verified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.verified ? 'Yes' : 'No'}
                    </span>
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
              >
                Manage Profile
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-xl text-gray-600">
                Please sign in to access your account.
              </p>
              <div className="space-x-4">
                <Link
                  href="/login"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}