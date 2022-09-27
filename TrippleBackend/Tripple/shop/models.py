from django.db import models

class Shop(models.Model):
    title = models.CharField(max_length=150, verbose_name='Наименование')
    type = models.CharField(max_length=150, default='None', verbose_name='Тип')
    content = models.TextField(blank=True, verbose_name='Контент')
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/',verbose_name='Фото')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано?')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['title']