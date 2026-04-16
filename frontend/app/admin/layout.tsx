import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      <aside className="w-64 border-r border-border bg-card p-6 hidden md:block shrink-0 shadow-sm z-10">
        <h2 className="text-xl font-bold mb-6 text-foreground">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors">Dashboard</Link>
          <Link href="/admin/sellers" className="px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium transition-colors">Approve Sellers</Link>
          <Link href="/admin/dashboard" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors">Commission Rates</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-background/50">
        {children}
      </main>
    </div>
  );
}
