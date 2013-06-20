from myapp.models import Pelicula
from django.contrib import admin

class PeliculaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'user', 'pub_date')
    search_fields = ['titulo', 'user']
    list_filter = ['user']

admin.site.register(Pelicula, PeliculaAdmin)
