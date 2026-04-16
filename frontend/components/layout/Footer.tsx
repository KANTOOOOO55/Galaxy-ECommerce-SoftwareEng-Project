export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto py-8 px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Galaxy Store. All rights reserved.
      </div>
    </footer>
  );
}
