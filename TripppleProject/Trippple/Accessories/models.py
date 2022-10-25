from django.db import models


class CPU(models.Model):
    manufacturer = models.CharField(max_length=150, db_index=True, verbose_name='Производитель')
    CPUmodel = models.CharField(max_length=150, db_index=True, verbose_name='Модель')
    socket_id = models.ForeignKey('Socket', on_delete=models.CASCADE, verbose_name='ID Сокета')
    basefrequency = models.FloatField(verbose_name='Частота процессора')
    RAMtype = models.ForeignKey('MemoryTypes', on_delete=models.CASCADE, verbose_name='ID типа памяти')
    RAMmax = models.IntegerField(verbose_name='Макcимальное количество RAM')
    RAMcount = models.IntegerField(verbose_name='Количество каналов RAM')
    CoresCount = models.IntegerField(verbose_name='Количество ядер')
    TPD = models.IntegerField(verbose_name='TPD')
    is_graphic = models.BooleanField(verbose_name='Есть графическое едро?')

    def __str__(self):
        return self.CPUmodel

    class Meta:
        verbose_name = 'Процессор'
        verbose_name_plural = 'Процессоры'
        ordering = ['CPUmodel']

class Socket(models.Model):
    title = models.CharField(max_length=150, db_index=True, verbose_name='Сокет')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Сокет'
        verbose_name_plural = 'Сокеты'
        ordering = ['title']

class MemoryTypes(models.Model):
    title = models.CharField(max_length=150, db_index=True, verbose_name='Тип памяти')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тип памяти'
        verbose_name_plural = 'Типы памяти'
        ordering = ['title']

class GPU(models.Model):
    manufacturer = models.CharField(max_length=150, db_index=True, verbose_name='Производитель')
    GPUmodel = models.CharField(max_length=150, db_index=True, verbose_name='Модель')
    amountvideomemory = models.FloatField(verbose_name='Количество видеопамяти')
    typememory_id = models.ForeignKey('VideoMemoryTypes', on_delete=models.CASCADE, verbose_name='Тип памяти')
    connectiontype = models.ForeignKey('ConnectionsTypes', on_delete=models.CASCADE, verbose_name='Интерфейс подключения')
    buswidth = models.IntegerField(verbose_name='Разрядность шины')

    def __str__(self):
        return self.GPUmodel

    class Meta:
        verbose_name = 'Видеокарта'
        verbose_name_plural = 'Видеокарты'
        ordering = ['GPUmodel']

class VideoMemoryTypes(models.Model):
    title = models.CharField(max_length=150, db_index=True, verbose_name='Тип памяти')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тип видео памяти'
        verbose_name_plural = 'Типы видео памяти'
        ordering = ['title']

class ConnectionsTypes(models.Model):
    title = models.CharField(max_length=150, db_index=True, verbose_name='Тип интерфейса подключения')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тип интерфейса подключения'
        verbose_name_plural = 'Типы интерфейса подключения'
        ordering = ['title']