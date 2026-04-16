'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/Alert';

export default function SellerRegisterPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.businessName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    setSuccess(true);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-background to-background -z-10"></div>
      
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-foreground tracking-tight">
            Partner with Galaxy Store
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Submit your business info to become a seller
          </p>
        </div>

        <Card className="mt-8 border shadow-2xl shadow-accent/5">
          <CardHeader>
            <h3 className="text-xl font-semibold">Business Information</h3>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert variant="success" className="mb-4">
                <AlertDescription>
                  Your application has been received and is pending review by our administration team. You will be notified once a decision has been made.
                </AlertDescription>
              </Alert>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Input
                  label="Business Name *"
                  id="businessName"
                  required
                  placeholder="Acme Corp"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />

                <Input
                  label="Business Email *"
                  id="email"
                  type="email"
                  required
                  placeholder="contact@acme.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                
                <Input
                  label="Phone Number *"
                  id="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                
                <div className="w-full flex flex-col gap-1.5">
                  <label className="text-sm font-medium leading-none">Business Description</label>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    placeholder="Tell us about what you sell..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full py-6 text-lg hover:shadow-lg transition-shadow" disabled={isLoading}>
                  {isLoading ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
