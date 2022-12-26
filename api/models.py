from django.db import models


class Shop(models.Model):
    name = models.CharField(max_length=100)
    toys = models.ManyToManyField(to='Toy')


class Toy(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название')
    price = models.PositiveIntegerField(verbose_name='Цена')
    amount = models.PositiveIntegerField(verbose_name='Количество')
    age = models.PositiveIntegerField(verbose_name='Возраст')

    def __str__(self) -> str:
        return f"{self.pk} - {self.title}"

    class Meta:
        verbose_name = 'Игрушка'
        verbose_name_plural = 'Игрушки'
