import React from 'react';

export function Alert({ 
  className = '', 
  variant = 'default',
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'destructive' | 'success' }) {
  const variants = {
    default: 'bg-card text-foreground border-border',
    destructive: 'border-red-500/50 text-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/20',
    success: 'border-green-500/50 text-green-600 dark:border-green-500 bg-green-50 dark:bg-green-950/20'
  };

  return (
    <div 
      className={`relative w-full rounded-lg border p-4 ${variants[variant]} ${className}`} 
      {...props} 
    />
  );
}

export function AlertTitle({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`} {...props} />;
}

export function AlertDescription({ className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props} />;
}
