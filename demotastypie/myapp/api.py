#encoding:utf-8
from django.contrib.auth.models import User
from tastypie import fields
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.serializers import Serializer
from myapp.models import Pelicula


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all().exclude(id=1)
        resource_name = 'user'
        excludes = ['resource_uri', 'id', 'username', 'first_name','last_name','email', 'last_login', 'password', 'is_active', 'is_staff', 'is_superuser','date_joined']
        allowed_methods = []
        filtering = { 
            'username': ALL,
        }

class PeliculaResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')

    class Meta:
        queryset = Pelicula.objects.all()
        resource_name = 'pelicula'
        authorization= Authorization()
        excludes = ['pub_date']
        allowed_methods = ['get', 'post']
        list_allowed_methods = ['get', 'post']
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post']
        filtering = {
            'user': ALL_WITH_RELATIONS,
        }
        serializer = Serializer(formats=['jsonp', 'json'])