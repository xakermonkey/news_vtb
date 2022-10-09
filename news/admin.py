from django.contrib import admin
from .models import *


# Register your models here.

class MediaAdmin(admin.ModelAdmin):
    list_display = ('name', 'url', 'logo', 'rss_url')


class RoleAdmin(admin.ModelAdmin):
    list_display = ("id", 'name',)


class TagsAdmin(admin.ModelAdmin):
    list_display = ('tag',)


class ArtilceAdmin(admin.ModelAdmin):
    list_display = ("id", 'title', 'img', 'description', 'body', 'media', 'category', 'date')


admin.site.register(Media, MediaAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Tags, TagsAdmin)
admin.site.register(Artilce, ArtilceAdmin)
