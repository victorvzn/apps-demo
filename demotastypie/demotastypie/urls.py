from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from tastypie.api import Api
from myapp.api import PeliculaResource, UserResource
v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(PeliculaResource())


urlpatterns = patterns('',
    # url(r'^$', 'demotastypie.views.home', name='home'),
    # url(r'^demotastypie/', include('demotastypie.foo.urls')),

    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),

	url(r'^$', 'myapp.views.index', name='index'),

    (r'^api/', include(v1_api.urls)),
)