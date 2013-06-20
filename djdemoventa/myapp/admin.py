#encoding:utf-8
from django.contrib import admin

from djdemoventa import settings
from djdemoventa.settings import MEDIA_ROOT

from myapp.models import Cliente
from myapp.models import Producto
from myapp.models import Venta
from myapp.models import DetalleVenta

class ClienteAdmin(admin.ModelAdmin):
    pass

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre','precio',)
    list_filter = ['nombre']
    search_fields = ['nombre','precio']

class DetalleVentaInline(admin.TabularInline):
    extra = 3
    fields = ('producto','precio_venta','cantidad',)
    readonly_fields = ('precio_venta',)
    model = DetalleVenta
    template = "admin/myapp/Venta/tabular_detalleventa.html"

    class Media:
        js = (
            "lib/jquery-1.8.3.min.js",
            "lib/demo.js",
        )

class VentaAdmin(admin.ModelAdmin):
    fields = ('cliente',)
    inlines = [DetalleVentaInline]
    list_display = ('cliente','total','fecha')
    list_filter = ['fecha']

admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Producto,ProductoAdmin)
admin.site.register(Venta, VentaAdmin)
admin.site.register(DetalleVenta)
