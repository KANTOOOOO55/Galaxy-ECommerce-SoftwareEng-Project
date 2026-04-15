from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicVendorViewSet, VendorDashboardProfileViewSet, VendorDashboardProductViewSet, VendorDashboardOrderViewSet

router = DefaultRouter()
router.register(r'', PublicVendorViewSet, basename='public-vendor')
router.register(r'dashboard/profile', VendorDashboardProfileViewSet, basename='vendor-profile')
router.register(r'dashboard/products', VendorDashboardProductViewSet, basename='vendor-product')
router.register(r'dashboard/orders', VendorDashboardOrderViewSet, basename='vendor-order')

urlpatterns = [
    path('', include(router.urls)),
]
