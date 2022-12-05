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
    TPD = models.IntegerField(default=100, verbose_name='TPD')
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

class Motherboard(models.Model):
    manufacturer = models.CharField(max_length=150, db_index=True, verbose_name='Производитель')
    MBmodel = models.CharField(max_length=150, db_index=True, verbose_name='Модель')
    socket_id = models.ForeignKey('Socket', on_delete=models.CASCADE, verbose_name='ID Сокета')
    chipset_id = models.ForeignKey('Chipset', on_delete=models.CASCADE, verbose_name='ID Чипсета')
    countslotsRAM = models.IntegerField(verbose_name='Количество слотов памяти')
    maxAmountRAM = models.IntegerField(verbose_name='Максимальный объем памяти')
    RAMtype = models.ForeignKey('MemoryTypes', on_delete=models.CASCADE, verbose_name='ID типа памяти', blank=True)
    connectiontype = models.ForeignKey('ConnectionsTypes', on_delete=models.CASCADE, verbose_name='Интерфейс подключения')
    is_SSD = models.BooleanField(verbose_name='Have SSD?')

    def __str__(self):
        return self.MBmodel

    class Meta:
        verbose_name = 'Материнская плата'
        verbose_name_plural = 'Материнские платы'
        ordering = ['MBmodel']

class Chipset(models.Model):
    title = models.CharField(max_length=150, db_index=True, verbose_name='Чипсет')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Чипсет'
        verbose_name_plural = 'Чипсет'
        ordering = ['title']

class RAM(models.Model):
    manufacturer = models.CharField(max_length=150, verbose_name='Производитель')
    RAMmodel = models.CharField(max_length=150, verbose_name='Модель')
    countRAM = models.IntegerField(verbose_name='Количество памяти')
    frequency = models.IntegerField(verbose_name='Частота', default=None)
    RAMtype = models.ForeignKey('MemoryTypes', on_delete=models.CASCADE, verbose_name='ID типа памяти', blank=True)

    def __str__(self):
        return self.RAMmodel

    class Meta:
        verbose_name = 'Оперативная память'
        verbose_name_plural = 'Оперативные памяти'
        ordering = ['RAMmodel']

class Memory(models.Model):
    manufacturer = models.CharField(max_length=150, verbose_name='Производитель')
    MEMmodel = models.CharField(max_length=150, verbose_name='Модель')
    countMEM = models.IntegerField(verbose_name='Количество памяти')
    speedMEM = models.IntegerField(verbose_name='Скорость вращения шпинделя', default=None)
    TPD = models.IntegerField(default=20, verbose_name='TPD')
    def __str__(self):
        return self.MEMmodel
    class Meta:
        verbose_name = 'Память'
        verbose_name_plural = 'Памяти'
        ordering = ['MEMmodel']

class SSDMemory(models.Model):
    manufacturer = models.CharField(max_length=150, verbose_name='Производитель')
    MEMmodel = models.CharField(max_length=150, verbose_name='Модель')
    countMEM = models.IntegerField(verbose_name='Количество памяти')
    speedMEMRead = models.IntegerField(verbose_name='Максимальная скорость последовательного чтения', default=None)
    speedMEMWrite = models.IntegerField(verbose_name='Максимальная скорость последовательной записи', default=None)
    TPD = models.IntegerField(default=20, verbose_name='TPD')
    def __str__(self):
        return self.MEMmodel
    class Meta:
        verbose_name = 'SSD Память'
        verbose_name_plural = 'SSD Памяти'
        ordering = ['MEMmodel']

class PS(models.Model):
    manufacturer = models.CharField(max_length=150, verbose_name='Производитель')
    PSmodel = models.CharField(max_length=150, verbose_name='Модель')
    power = models.IntegerField(verbose_name='Мощность')
    def __str__(self):
        return self.PSmodel
    class Meta:
        verbose_name = 'Блок питания'
        verbose_name_plural = 'Блоки питания'
        ordering = ['PSmodel']