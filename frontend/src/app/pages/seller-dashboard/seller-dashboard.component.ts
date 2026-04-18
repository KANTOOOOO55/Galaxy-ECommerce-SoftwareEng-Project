import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seller-dashboard',
  template: `
    <div class="container py-xl">
      <div class="flex justify-between items-center mb-xl flex-wrap gap-4">
        <div>
          <h1 class="title">Seller Dashboard</h1>
          <p class="subtitle mt-sm">Manage your store, upload products, and view analytics.</p>
        </div>
        <button class="btn btn-primary" (click)="toggleUploadForm()">
          {{ showUploadForm ? 'Cancel Upload' : '+ Upload New Product' }}
        </button>
      </div>
      
      <div *ngIf="vendorProfile && !vendorProfile.is_approved" class="alert-warning mb-xl">
        <strong>⚠️ Account Pending Approval:</strong> Your application to sell is currently being reviewed by an admin. You cannot upload products yet.
      </div>

      <div *ngIf="showUploadForm && vendorProfile?.is_approved" class="card form-card mb-xl">
        <h2 class="sub-title">Upload Product</h2>
        <div *ngIf="error" class="error-alert mt-md">{{ error }}</div>
        
        <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="mt-xl">
          <div class="form-grid">
            <div class="form-group">
              <label>Product Name</label>
              <input type="text" formControlName="name" class="form-control" placeholder="E.g. Galaxy Smartphone XYZ">
            </div>
            <div class="form-group">
              <label>SKU (Stock Keeping Unit)</label>
              <input type="text" formControlName="sku" class="form-control" placeholder="E.g. GLX-PHN-01">
            </div>
            <div class="form-group">
              <label>Price ($)</label>
              <input type="number" formControlName="price" class="form-control" placeholder="0.00">
            </div>
            <div class="form-group">
              <label>Stock Quantity</label>
              <input type="number" formControlName="stock_quantity" class="form-control" placeholder="10">
            </div>
          </div>
          
          <div class="form-group mt-md">
            <label>Description</label>
            <textarea formControlName="description" class="form-control" rows="4" placeholder="Detail the features of your product..."></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary mt-lg" [disabled]="productForm.invalid || loading">
            {{ loading ? 'Uploading...' : 'Publish Product' }}
          </button>
        </form>
      </div>

      <div class="card p-xl">
        <h2 class="sub-title mb-md">My Products</h2>
        <div *ngIf="products.length === 0" class="empty-state text-muted py-xl text-center">
          <div class="empty-icon mb-md">📦</div>
          You haven't uploaded any products yet.
        </div>
        <div *ngIf="products.length > 0" class="table-container">
          <table class="w-100 vendor-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of products">
                <td class="font-bold text-muted">{{ p.sku }}</td>
                <td class="font-bold">{{ p.name }}</td>
                <td class="text-primary font-bold">\${{ p.price }}</td>
                <td>{{ p.stock_quantity }}</td>
                <td><span class="star">★</span> {{ p.average_rating || 0 | number:'1.1-1' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .py-xl { padding-top: 3rem; padding-bottom: 3rem; }
    .p-xl { padding: 2rem; }
    .mb-xl { margin-bottom: 3rem; }
    .mb-md { margin-bottom: 1.5rem; }
    .mt-sm { margin-top: 0.5rem; }
    .mt-md { margin-top: 1.5rem; }
    .mt-xl { margin-top: 2rem; }
    .title { font-size: 2.5rem; letter-spacing: -0.5px; }
    .subtitle { color: var(--text-muted); font-size: 1.125rem; }
    .sub-title { font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1rem; }
    
    .card { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.05); }
    .form-card { padding: 2.5rem; }
    
    .alert-warning { background: #fef3c7; color: #92400e; padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid #f59e0b; }
    .error-alert { background: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: var(--radius-md); font-size: 0.875rem; text-align: center; }
    
    .form-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
    @media(min-width: 768px) { .form-grid { grid-template-columns: 1fr 1fr; } }
    
    .form-group label { display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--text-main); }
    .form-control { width: 100%; padding: 0.75rem 1rem; border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); font-family: var(--font-body); outline: none; transition: all var(--transition-fast); }
    .form-control:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); }
    
    .table-container { overflow-x: auto; }
    .vendor-table { border-collapse: collapse; text-align: left; }
    .vendor-table th { padding: 1rem; border-bottom: 2px solid rgba(0,0,0,0.05); color: var(--text-muted); font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .vendor-table td { padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
    
    .font-bold { font-weight: 600; }
    .text-muted { color: var(--text-muted); }
    .text-primary { color: var(--primary); }
    .star { color: #fbbf24; }
    .empty-icon { font-size: 4rem; opacity: 0.5; }
    .text-center { text-align: center; }
  `]
})
export class SellerDashboardComponent implements OnInit {
  vendorProfile: any = null;
  products: any[] = [];
  showUploadForm = false;
  productForm: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock_quantity: ['', [Validators.required, Validators.min(0)]],
      sku: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    // Only fetch first profile element
    this.http.get<any[]>('/api/vendors/dashboard/profile/').subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.vendorProfile = res[0];
          if (this.vendorProfile.is_approved) {
             this.loadProducts();
          }
        }
      }
    });
  }

  loadProducts() {
    this.http.get<any[]>('/api/vendors/dashboard/products/').subscribe({
      next: (data) => this.products = data
    });
  }

  toggleUploadForm() {
    this.showUploadForm = !this.showUploadForm;
  }

  onSubmit() {
    if (this.productForm.invalid || !this.vendorProfile?.is_approved) return;
    this.loading = true;
    this.error = '';

    this.http.post('/api/vendors/dashboard/products/', this.productForm.value).subscribe({
      next: (newProduct) => {
        this.products.unshift(newProduct);
        this.loading = false;
        this.showUploadForm = false;
        this.productForm.reset();
      },
      error: err => {
        this.error = 'Upload failed. Check SKU Uniqueness.';
        this.loading = false;
      }
    });
  }
}
