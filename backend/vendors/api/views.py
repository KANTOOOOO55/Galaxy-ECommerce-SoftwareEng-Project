from rest_framework import viewsets, permissions, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from vendors.models import VendorProfile
from products.models import Product
from .serializers import VendorProfileSerializer, VendorProductSerializer

class PublicVendorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VendorProfile.objects.filter(is_approved=True)
    serializer_class = VendorProfileSerializer

class VendorDashboardProfileViewSet(viewsets.ModelViewSet):
    serializer_class = VendorProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return VendorProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        vendor = getattr(request.user, 'vendor_profile', None)
        if not vendor:
            return Response({'detail': 'No vendor profile associated with this user.'}, status=403)
        from orders.models import OrderItem
        items = OrderItem.objects.filter(vendor=vendor)
        total_revenue = sum(item.price_at_purchase * item.quantity for item in items)
        items_sold = sum(item.quantity for item in items)
        return Response({
            'total_revenue': total_revenue,
            'items_sold': items_sold,
        })

class VendorDashboardProductViewSet(viewsets.ModelViewSet):
    serializer_class = VendorProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if not hasattr(self.request.user, 'vendor_profile'):
            return Product.objects.none()
        return Product.objects.filter(vendor=self.request.user.vendor_profile)

    def perform_create(self, serializer):
        if not hasattr(self.request.user, 'vendor_profile'):
            raise exceptions.PermissionDenied('You do not have a vendor profile.')
        serializer.save(vendor=self.request.user.vendor_profile)

from orders.models import OrderItem
from .serializers import VendorOrderItemSerializer

class VendorDashboardOrderViewSet(viewsets.ModelViewSet):
    serializer_class = VendorOrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if not hasattr(self.request.user, 'vendor_profile'):
            return OrderItem.objects.none()
        return OrderItem.objects.filter(vendor=self.request.user.vendor_profile).order_by('-id')
