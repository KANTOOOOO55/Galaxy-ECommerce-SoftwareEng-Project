'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/Alert';

export default function UploadProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    stock: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title || !formData.price || !formData.category || !formData.stock) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    setSuccess(true);
    setFormData({ title: '', price: '', category: '', description: '', stock: '' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-gray-500 mt-2">List a new product to your store catalog.</p>
      </div>

      <Card className="border shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="space-y-4">
              <Alert variant="success" className="animate-in slide-in-from-top-2">
                <AlertDescription>
                  Product successfully submitted! It will appear in your dashboard and be visible to customers upon approval.
                </AlertDescription>
              </Alert>
              <Button onClick={() => setSuccess(false)}>Add Another Product</Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Product Title *"
                  required
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="md:col-span-2"
                />

                <Input
                  label="Price ($) *"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
                
                <Input
                  label="Initial Stock *"
                  type="number"
                  min="0"
                  required
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                />

                <Input
                  label="Category *"
                  required
                  placeholder="e.g. Electronics"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="md:col-span-2"
                />
                
                <div className="w-full flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-medium leading-none">Product Description</label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    placeholder="Describe your product's features, specifications, and benefits..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border mt-6">
                <Button type="submit" className="w-full md:w-auto px-8" disabled={isLoading}>
                  {isLoading ? 'Saving Product...' : 'Save Product'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
