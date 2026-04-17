import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  get primaryImageUrl(): string {
    const primary = this.product.images.find(img => img.is_primary);
    return primary ? primary.image : (this.product.images[0]?.image || '/placeholder.jpg');
  }

  get formattedPrice(): string {
    return Number(this.product.price).toFixed(2);
  }

  get formattedRating(): string {
    return Number(this.product.average_rating).toFixed(1);
  }
}
