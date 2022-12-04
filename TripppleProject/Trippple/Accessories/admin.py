from django.contrib import admin

from.models import CPU, MemoryTypes, Socket, GPU, VideoMemoryTypes, ConnectionsTypes, Motherboard, Chipset, RAM, Memory, SSDMemory, PS

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

class MotherboardAdmin(admin.ModelAdmin):
    list_display = ('id', 'manufacturer', 'MBmodel', 'maxAmountRAM')
    list_display_links = ('id', 'MBmodel')
    search_fields = ('MBmodel', 'manufacturer')
    list_filter = ('manufacturer',)

class ChipsetAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)

class RAMAdmin(admin.ModelAdmin):
    list_display = ('id', 'manufacturer', 'RAMmodel', 'countRAM')
    list_display_links = ('id', 'countRAM')
    search_fields = ('RAMmodel', 'manufacturer')
    list_filter = ('manufacturer',)

class MemoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'manufacturer', 'MEMmodel', 'countMEM')
    list_display_links = ('id', 'manufacturer', 'countMEM')
    search_fields = ('MEMmodel', 'manufacturer')
    list_filter = ('manufacturer',)

class SSDMemoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'manufacturer', 'MEMmodel', 'countMEM')
    list_display_links = ('id', 'manufacturer', 'countMEM')
    search_fields = ('MEMmodel', 'manufacturer')
    list_filter = ('manufacturer',)

class PSAdmin(admin.ModelAdmin):
    list_display = ('id', 'manufacturer', 'PSmodel', 'power')
    list_display_links = ('id', 'manufacturer', 'power')
    search_fields = ('PSmodel', 'manufacturer')
    list_filter = ('manufacturer',)

admin.site.register(CPU, CPUAdmin)
admin.site.register(MemoryTypes, MemoryTypesAdmin)
admin.site.register(Socket, SocketAdmin)
admin.site.register(GPU, GPUAdmin)
admin.site.register(VideoMemoryTypes, VideoMemoryTypesAdmin)
admin.site.register(ConnectionsTypes, ConnectionsTypesAdmin)
admin.site.register(Motherboard, MotherboardAdmin)
admin.site.register(Chipset, ChipsetAdmin)
admin.site.register(RAM, RAMAdmin)
admin.site.register(Memory, MemoryAdmin)
admin.site.register(SSDMemory, SSDMemoryAdmin)
admin.site.register(PS, PSAdmin)