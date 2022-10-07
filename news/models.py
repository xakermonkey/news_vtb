from django.db import models


# Create your models here.


class TableDuration(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название таблицы")
    duration = models.DecimalField(max_digits=12, decimal_places=6, verbose_name="Время запроса")

    class Meta:
        verbose_name = "Время запроса"
        verbose_name_plural = "Время запроса"

    def __str__(self):
        return f"{self.name} {self.duration}"
