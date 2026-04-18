from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicVendorViewSet, VendorDashboardProfileViewSet, VendorDashboardProductViewSet, VendorDashboardOrderViewSet, AdminVendorViewSet

router = DefaultRouter()
router.register(r'admin', AdminVendorViewSet, basename='admin-vendor')
router.register(r'dashboard/profile', VendorDashboardProfileViewSet, basename='vendor-profile')
router.register(r'dashboard/products', VendorDashboardProductViewSet, basename='vendor-product')
router.register(r'dashboard/orders', VendorDashboardOrderViewSet, basename='vendor-order')
router.register(r'', PublicVendorViewSet, basename='public-vendor')

urlpatterns = [
    path('', include(router.urls)),
]
