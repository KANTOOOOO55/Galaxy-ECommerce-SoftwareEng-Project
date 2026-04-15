from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from products.models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category__slug', 'vendor']
    search_fields = ['name', 'description']

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

from rest_framework import permissions, exceptions
from orders.models import OrderItem
from products.models import ProductReview
from .serializers import ProductReviewSerializer

class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all().order_by('-created_at')
    serializer_class = ProductReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product']

    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        user = self.request.user
        
        # Verify purchase
        if not OrderItem.objects.filter(order__user=user, product=product).exists():
            raise exceptions.PermissionDenied("You can only review products you have purchased.")
        
        # Verify uniqueness is handled by DB but we can raise nice error
        if ProductReview.objects.filter(product=product, user=user).exists():
             raise exceptions.ValidationError("You have already reviewed this product.")

        serializer.save(user=user)
