from django.db import models


# Create your models here.


class Media(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название СМИ")
    url = models.URLField(max_length=255, verbose_name="Ссылка на СМИ")
    logo = models.URLField(verbose_name="Ссылка на логотип СМИ")
    rss_url = models.URLField(verbose_name="RSS поток")

    class Meta:
        verbose_name = "СМИ"
        verbose_name_plural = "СМИ"

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название роли в компании")

    class Meta:
        verbose_name = "Роль в компании"
        verbose_name_plural = "Роли в компаниях"

    def __str__(self):
        return self.name


class Tags(models.Model):
    tag = models.CharField(max_length=255, verbose_name="Название тега")


    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"

    def __str__(self):
        return self.tag

class Artilce(models.Model):
    title = models.CharField(max_length=500, verbose_name="Заголовок статьи")
    img = models.URLField(verbose_name="Фотография статьи", null=True, blank=True)
    description = models.CharField(max_length=1500, verbose_name="Краткое описание статьи", null=True, blank=True)
    body = models.TextField(verbose_name="Текст статьи", null=True, blank=True)
    tags = models.ManyToManyField(Tags, verbose_name="Теги")
    media = models.ForeignKey(Media, on_delete=models.SET_NULL, null=True, verbose_name="СМИ")
    category = models.IntegerField(verbose_name="Какой роли относится статья", null=True, blank=True)
    date = models.DateTimeField(auto_now=False, verbose_name="Дата публикации", null=True, blank=True)


    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"

    def __str__(self):
        return self.title