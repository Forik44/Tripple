from django.contrib import admin

from.models import Product, Category, Stock, Bucket, CustomUser, Role

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category_id', 'is_published')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'content')
    list_editable = ('is_published',)
    list_filter = ('is_published',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)

class StockAdmin(admin.ModelAdmin):
    list_display = ('product_id', 'amount')
    list_display_links = ('product_id', 'amount')
    search_fields = ('product_id',)

class BucketAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'product_id', 'amount')
    list_display_links = ('product_id', 'user_id', 'amount')
    search_fields = ('product_id', 'user_id')

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'phone')
    list_display_links = ('id', 'user')
    search_fields = ('id', 'user', 'phone')

class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Stock, StockAdmin)
admin.site.register(Bucket, BucketAdmin)
admin.site.register(CustomUser, UserAdmin)
admin.site.register(Role, RoleAdmin)