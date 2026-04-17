from django.contrib import admin
from .models import SubscriptionPlan, VendorSubscription

@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'monthly_price')
    search_fields = ('name',)

@admin.register(VendorSubscription)
class VendorSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'plan', 'status', 'start_date', 'end_date', 'paid_price')
    list_filter = ('status', 'plan', 'start_date', 'end_date')
    search_fields = ('vendor__store_name', 'plan__name')
    readonly_fields = ('start_date', 'end_date')
