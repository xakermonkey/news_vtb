# Generated by Django 4.1.2 on 2022-10-09 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0003_remove_artilce_inoagent_artilce_link_media_inoagent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artilce',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='news.tags', verbose_name='Теги'),
        ),
    ]
