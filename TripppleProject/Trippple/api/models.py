from django.db import models

# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=150, verbose_name='Наименование')
    content = models.TextField(blank=True, verbose_name='Контент')
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/', verbose_name='Фото')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано?')
    price = models.IntegerField(verbose_name='Стоимость')
    category_id = models.ForeignKey('Category', on_delete=models.CASCADE, verbose_name='Категория')
    accessory_id = models.IntegerField(default=0, verbose_name='ID комплектующего')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['title']

class Category(models.Model):
    title = models.CharField(max_length=150, db_index=True, verbose_name='Наименование категории')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['title']

class Stock(models.Model):
    product_id = models.OneToOneField('Product', on_delete=models.CASCADE, verbose_name='ID продукта', primary_key=True)
    amount = models.IntegerField(verbose_name='Количество')

    def __str__(self):
        return str(self.product_id)

    class Meta:
        verbose_name = 'Предмет на складе'
        verbose_name_plural = 'Предметы на складе'
        ordering = ['product_id']

class Bucket(models.Model):
    product_id = models.ForeignKey('Product', on_delete=models.CASCADE, verbose_name='ID Продукта')
    amount = models.IntegerField(verbose_name='Количество')
    user_id = models.ForeignKey('CustomUser', on_delete=models.CASCADE, verbose_name='ID пользователя')

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'
        ordering = ['user_id']

from django.conf import settings

class CustomUser(models.Model):
    phone = models.CharField(max_length=13, verbose_name='Телефон')
    role = models.ForeignKey('Role', on_delete=models.CASCADE, verbose_name='Роль',default=1)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    JWT = models.CharField(max_length=300, verbose_name='JWT', blank=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['id']

class Role(models.Model):
    title = models.CharField(max_length=150, db_index=True, verbose_name='Наименование роли')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'
        ordering = ['title']
