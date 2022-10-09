from django.urls import path
from .views import *

urlpatterns=[
    path('', index, name='index'),
    path('api', api, name='api'),
    path('get_news', GetNews.as_view())
]