'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CustomerRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    setSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-foreground tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join Galaxy Store to track your orders
          </p>
        </div>

        <Card className="mt-8 border shadow-2xl shadow-primary/5">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Customer Registration</h3>
            </div>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert variant="success" className="mb-4">
                <AlertDescription>
                  Registration successful! Redirecting...
                </AlertDescription>
              </Alert>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Input
                  label="Email address"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  className="w-full py-6 text-lg hover:shadow-lg transition-shadow"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center border-t border-border mt-4 pt-6">
            <p className="text-sm text-gray-500">
              Are you a merchant?{' '}
              <Link href="/seller/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Register a seller account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
