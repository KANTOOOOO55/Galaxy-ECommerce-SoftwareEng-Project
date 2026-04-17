import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Navbar will go here once created -->
      <nav class="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <a routerLink="/" class="text-2xl font-bold tracking-tight text-primary">GALAXY STORE</a>
        <div class="flex gap-6">
          <a routerLink="/" class="font-medium hover:text-primary transition-colors">Home</a>
          <a routerLink="/search" class="font-medium hover:text-primary transition-colors">Search</a>
        </div>
      </nav>

      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-slate-900 text-slate-400 py-12 px-6 mt-20 border-t border-slate-800">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="text-white font-bold text-xl">Galaxy E-Commerce</div>
          <div class="flex gap-8 text-sm">
            <a href="#" class="hover:text-white transition-colors">About Us</a>
            <a href="#" class="hover:text-white transition-colors">Contact</a>
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <p class="text-xs">&copy; 2026 Galaxy Store. Built for the future.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'frontend';
}
