from django.contrib import admin

from.models import Shop

class ShopAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'content')

admin.site.register(Shop, ShopAdmin)
