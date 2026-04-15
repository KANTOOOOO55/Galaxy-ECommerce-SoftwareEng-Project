import pytest
from rest_framework.test import APIClient
from products.models import Product, Category
from vendors.models import VendorProfile
from users.models import User
from orders.models import Order, OrderItem

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def vendor_user():
    user = User.objects.create_user(username='vendor1', email='vendor1@example.com', password='password', user_type='VENDOR')
    return user

@pytest.fixture
def vendor_profile(vendor_user):
    return VendorProfile.objects.create(user=vendor_user, store_name='Store 1', is_approved=True)

@pytest.fixture
def category():
    return Category.objects.create(name='Electronics', slug='electronics')

@pytest.mark.django_db
class TestVendorAPI:
    def test_list_public_vendors(self, api_client, vendor_profile):
        url = '/api/vendors/'
        response = api_client.get(url)
        assert response.status_code == 200
        assert len(response.data) == 1
        assert response.data[0]['store_name'] == 'Store 1'

    def test_vendor_dashboard_profile_unauthorized(self, api_client):
        url = '/api/vendors/dashboard/profile/'
        response = api_client.get(url)
        assert response.status_code == 401

    def test_vendor_dashboard_profile_authorized(self, api_client, vendor_user, vendor_profile):
        api_client.force_authenticate(user=vendor_user)
        url = '/api/vendors/dashboard/profile/'
        response = api_client.get(url)
        assert response.status_code == 200
        assert len(response.data) == 1
        assert response.data[0]['store_name'] == 'Store 1'

    def test_vendor_create_product(self, api_client, vendor_user, vendor_profile, category):
        api_client.force_authenticate(user=vendor_user)
        url = '/api/vendors/dashboard/products/'
        data = {
            'category': category.id,
            'name': 'Laptop',
            'description': 'A laptop',
            'price': '1500.00',
            'stock_quantity': 5,
            'sku': 'LAPTOP-001'
        }
        response = api_client.post(url, data)
        assert response.status_code == 201
        assert response.data['name'] == 'Laptop'
        assert Product.objects.first().vendor == vendor_profile

@pytest.fixture
def product(vendor_profile, category):
    return Product.objects.create(vendor=vendor_profile, category=category, name='P1', description='D1', price='100.00', stock_quantity=10, sku='SKU1')

@pytest.fixture
def order_item(vendor_profile, product):
    user = User.objects.create_user(username='c2', email='c2@test.com', password='password')
    order = Order.objects.create(user=user, tracking_number='TRK-456', total_amount='100.00')
    return OrderItem.objects.create(order=order, product=product, vendor=vendor_profile, quantity=2, price_at_purchase='100.00')

class TestVendorDashboardAPI:
    @pytest.mark.django_db
    def test_vendor_analytics(self, api_client, vendor_user, vendor_profile, order_item):
        api_client.force_authenticate(user=vendor_user)
        url = '/api/vendors/dashboard/profile/analytics/'
        response = api_client.get(url)
        assert response.status_code == 200
        assert response.data['total_revenue'] == 200.0
        assert response.data['items_sold'] == 2

    @pytest.mark.django_db
    def test_vendor_orders(self, api_client, vendor_user, order_item):
        api_client.force_authenticate(user=vendor_user)
        url = '/api/vendors/dashboard/orders/'
        response = api_client.get(url)
        assert response.status_code == 200
        assert len(response.data) == 1
        assert response.data[0]['quantity'] == 2
