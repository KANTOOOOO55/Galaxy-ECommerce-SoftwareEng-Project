import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container py-xl">
      <div class="dashboard-header flex justify-between items-center mb-xl">
        <div>
          <h1 class="title">Admin Dashboard</h1>
          <p class="subtitle mt-sm">Manage pending seller applications and monitor platform vendors.</p>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <h2 class="sub-title mb-md">Vendor Applications</h2>
          
          <div *ngIf="loading" class="loading-state">Loading vendors...</div>
          
          <div *ngIf="!loading && vendors.length === 0" class="empty-state border border-dashed rounded-lg">
            <div class="empty-icon text-muted">📋</div>
            <p>No vendor applications found.</p>
          </div>

          <div *ngIf="!loading && vendors.length > 0" class="table-container">
            <table class="w-100 vendor-table">
              <thead>
                <tr>
                  <th>Store Name</th>
                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let vendor of vendors" [class.bg-gray-50]="vendor.is_approved">
                  <td class="font-bold">{{ vendor.store_name }}</td>
                  <td>
                    <span class="badge" [class.badge-success]="vendor.is_approved" [class.badge-warning]="!vendor.is_approved">
                      {{ vendor.is_approved ? 'Approved' : 'Pending Review' }}
                    </span>
                  </td>
                  <td class="actions-cell">
                    <button *ngIf="!vendor.is_approved" (click)="approve(vendor.id)" class="btn btn-sm btn-success">Approve</button>
                    <button *ngIf="vendor.is_approved" (click)="reject(vendor.id)" class="btn btn-sm btn-alert ml-sm">Revoke</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .py-xl { padding-top: 3rem; padding-bottom: 3rem; }
    .mb-xl { margin-bottom: 3rem; }
    .mb-md { margin-bottom: 1.5rem; }
    .title { font-size: 2.5rem; letter-spacing: -0.5px; }
    .subtitle { color: var(--text-muted); font-size: 1.125rem; }
    .sub-title { font-family: var(--font-heading); font-size: 1.5rem; }
    
    .card { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); overflow: hidden; border: 1px solid rgba(0,0,0,0.05); }
    .card-content { padding: 2rem; }
    
    .table-container { overflow-x: auto; }
    .vendor-table { border-collapse: collapse; text-align: left; }
    .vendor-table th { padding: 1rem; border-bottom: 2px solid rgba(0,0,0,0.05); color: var(--text-muted); font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .vendor-table td { padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
    
    .font-bold { font-weight: 600; }
    .text-muted { color: var(--text-muted); }
    
    .badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .badge-success { background: #dcfce7; color: #166534; }
    .badge-warning { background: #fef9c3; color: #854d0e; }
    
    .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; border-radius: var(--radius-md); border: none; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); }
    .btn-success { background: #10b981; color: white; }
    .btn-success:hover { background: #059669; }
    .btn-alert { background: #ef4444; color: white; }
    .btn-alert:hover { background: #dc2626; }
    .ml-sm { margin-left: 0.5rem; }
    .actions-cell { display: flex; gap: 0.5rem; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  vendors: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
    this.loading = true;
    this.http.get<any[]>('/api/vendors/admin/').subscribe({
      next: (data) => {
        this.vendors = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  approve(id: number) {
    this.http.post(`/api/vendors/admin/${id}/approve/`, {}).subscribe({
      next: () => this.loadVendors()
    });
  }

  reject(id: number) {
    this.http.post(`/api/vendors/admin/${id}/reject/`, {}).subscribe({
      next: () => this.loadVendors()
    });
  }
}
