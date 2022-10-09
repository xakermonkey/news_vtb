#!/bin/bash

python manage.py makemigrations news
python manage.py migrate
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', '', 'admin')" | python manage.py shell
gunicorn --bind 0.0.0.0:8000 news_vtb.wsgi