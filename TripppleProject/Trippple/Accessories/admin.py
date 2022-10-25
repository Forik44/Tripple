from django.contrib import admin

from.models import CPU, MemoryTypes, Socket, GPU, VideoMemoryTypes, ConnectionsTypes

class CPUAdmin(admin.ModelAdmin):
    list_display = ('id', 'manufacturer', 'CPUmodel', 'is_graphic')
    list_display_links = ('id', 'CPUmodel')
    search_fields = ('CPUmodel', 'manufacturer')
    list_editable = ('is_graphic',)
    list_filter = ('is_graphic',)

class MemoryTypesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)

class SocketAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)

class GPUAdmin(admin.ModelAdmin):
    list_display = ('id', 'manufacturer', 'GPUmodel', 'amountvideomemory')
    list_display_links = ('id', 'amountvideomemory')
    search_fields = ('GPUmodel', 'manufacturer')
    list_filter = ('manufacturer',)

class VideoMemoryTypesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)

class ConnectionsTypesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)

admin.site.register(CPU, CPUAdmin)
admin.site.register(MemoryTypes, MemoryTypesAdmin)
admin.site.register(Socket, SocketAdmin)
admin.site.register(GPU, GPUAdmin)
admin.site.register(VideoMemoryTypes, VideoMemoryTypesAdmin)
admin.site.register(ConnectionsTypes, ConnectionsTypesAdmin)