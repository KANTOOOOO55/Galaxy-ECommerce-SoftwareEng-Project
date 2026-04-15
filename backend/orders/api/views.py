import uuid
from rest_framework import viewsets, permissions, status, decorators, response
from django.shortcuts import get_object_or_404
from orders.models import Cart, CartItem, Order, OrderItem
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer
from products.models import Product

def get_or_create_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return cart
    
    session_id = request.session.session_key
    if not session_id:
        request.session.create()
        session_id = request.session.session_key
    cart, _ = Cart.objects.get_or_create(session_id=session_id, user=None)
    return cart

class CartViewSet(viewsets.ViewSet):
    def list(self, request):
        cart = get_or_create_cart(request)
        serializer = CartSerializer(cart)
        return response.Response(serializer.data)

    @decorators.action(detail=False, methods=['post'])
    def add_item(self, request):
        cart = get_or_create_cart(request)
        product_id = request.data.get('product')
        if not product_id:
             return response.Response({"detail": "product ID required"}, status=status.HTTP_400_BAD_REQUEST)
        
        quantity = int(request.data.get('quantity', 1))

        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        else:
            cart_item.quantity = quantity
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    @decorators.action(detail=False, methods=['post'])
    def checkout(self, request):
        cart = get_or_create_cart(request)
        if not cart.items.exists():
            return response.Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = sum(item.product.price * item.quantity for item in cart.items.all())
        order = Order.objects.create(
            user=request.user,
            total_amount=total_amount,
            tracking_number=str(uuid.uuid4()).split('-')[0].upper()
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                vendor=item.product.vendor,
                quantity=item.quantity,
                price_at_purchase=item.product.price
            )

        cart.items.all().delete()
        serializer = OrderSerializer(order)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)
