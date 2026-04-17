from django.contrib import admin
from .models import VendorProfile

@admin.register(VendorProfile)
class VendorProfileAdmin(admin.ModelAdmin):
    list_display = ('store_name', 'user', 'is_approved', 'auto_renewal')
    list_filter = ('is_approved', 'auto_renewal')
    search_fields = ('store_name', 'user__email', 'user__username', 'description')
    actions = ['approve_vendors', 'disapprove_vendors']

    @admin.action(description="Approve selected vendors")
    def approve_vendors(self, request, queryset):
        queryset.update(is_approved=True)

    @admin.action(description="Disapprove selected vendors")
    def disapprove_vendors(self, request, queryset):
        queryset.update(is_approved=False)
