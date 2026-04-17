import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  slug: string = '';
  products: Product[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.slug).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching category products:', err);
        this.loading = false;
      }
    });
  }
}
