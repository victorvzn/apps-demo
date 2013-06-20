# Create your views here.
from django.http import HttpResponse
from django.core import serializers
from myapp.models import Producto
from django.utils import simplejson

from django.contrib.auth.decorators import login_required

@login_required
def get_precio_venta(request, producto_id):
	if producto_id <> "":
		consulta = Producto.objects.get(pk=producto_id)
		if consulta <> "":
			return HttpResponse(simplejson.dumps({'pk': consulta.pk, 'precio': str(consulta.precio)}))
