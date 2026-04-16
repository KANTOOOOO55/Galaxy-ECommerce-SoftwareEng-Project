import Link from 'next/link';
import { Button } from '../ui/Button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-2xl">
            Galaxy Store
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form action="/search" className="relative">
              <input
                type="search"
                name="q"
                placeholder="Search products..."
                className="h-10 w-full md:w-[300px] lg:w-[400px] rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </form>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/register">
              <Button variant="ghost">Sign In / Register</Button>
            </Link>
            <Link href="/seller/register">
              <Button variant="secondary" className="border border-border">Sell with us</Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
