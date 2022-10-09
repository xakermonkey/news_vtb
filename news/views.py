from django.shortcuts import render
from .models import *
import feedparser

agent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"


def index(request):
    n = []
    for media in Media.objects.all():
        feedpaper = feedparser.parse(media.rss_url, agent=agent)
        for new in feedpaper.entries:
            n.append(new)

    return render(request, 'index.html')


def api(request):
    return render(request, 'api.html')
