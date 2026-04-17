import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/products/';

  constructor(private http: HttpClient) { }

  getProducts(categorySlug?: string, search?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (categorySlug) {
      params = params.set('category__slug', categorySlug);
    }
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${id}/`);
  }
}
