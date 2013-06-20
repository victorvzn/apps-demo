#encoding:utf-8

from django.contrib.auth.models import User
from django.db import models


class Pelicula(models.Model):
    titulo = models.CharField(max_length=200, verbose_name='Título', unique=True, help_text='Redacta el tìtulo del film')
    pub_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return self.titulo