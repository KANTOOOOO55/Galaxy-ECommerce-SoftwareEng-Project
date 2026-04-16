'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/Alert';

type SellerApp = {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const mockApplications: SellerApp[] = [
  { id: '1', name: 'Tech Haven', email: 'contact@techhaven.com', status: 'pending', date: '2026-04-16' },
  { id: '2', name: 'Fashion Forward', email: 'hello@fashionforward.com', status: 'pending', date: '2026-04-15' },
];

export default function AdminApproveSellers() {
  const [applications, setApplications] = useState<SellerApp[]>(mockApplications);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'destructive'} | null>(null);

  const handleDecision = (id: string, decision: 'approved' | 'rejected') => {
    setApplications(apps => apps.map(app => 
      app.id === id ? { ...app, status: decision } : app
    ));
    setNotification({
      message: `Seller application has been ${decision}.`,
      type: 'success'
    });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const pendingApps = applications.filter(app => app.status === 'pending');
  const reviewedApps = applications.filter(app => app.status !== 'pending');

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Review Sellers</h1>
        <p className="text-gray-500 mt-2">Approve or reject new merchant applications securely.</p>
      </div>

      {notification && (
        <Alert variant={notification.type} className="animate-in slide-in-from-top-4">
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pending Applications ({pendingApps.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingApps.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50/50 dark:bg-gray-900/50 rounded-lg">
              No pending applications to review.
            </div>
          ) : (
            <div className="relative overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-4">Business Name</th>
                    <th scope="col" className="px-6 py-4">Email</th>
                    <th scope="col" className="px-6 py-4">Date Applied</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApps.map((app) => (
                    <tr key={app.id} className="bg-card border-t border-border hover:bg-accent/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{app.name}</td>
                      <td className="px-6 py-4 text-gray-500">{app.email}</td>
                      <td className="px-6 py-4 text-gray-500">{app.date}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleDecision(app.id, 'rejected')} className="text-red-500 hover:text-red-600 hover:bg-red-50">Reject</Button>
                        <Button variant="primary" size="sm" onClick={() => handleDecision(app.id, 'approved')} className="shadow-sm">Approve</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {reviewedApps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-4">Business Name</th>
                      <th scope="col" className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewedApps.map((app) => (
                      <tr key={app.id} className="bg-card border-t border-border">
                        <td className="px-6 py-4 font-medium text-foreground">{app.name}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${app.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
