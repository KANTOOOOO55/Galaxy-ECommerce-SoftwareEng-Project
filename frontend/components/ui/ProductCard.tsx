import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card';
import { Button } from './Button';

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  rating?: number;
}

export function ProductCard({ id, title, price, category, imageUrl, rating = 0 }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-foreground">
          {category}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-2" title={title}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-end">
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
          {rating > 0 && (
            <div className="flex items-center text-yellow-500 text-sm">
              <span className="mr-1">★</span> {rating.toFixed(1)}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
