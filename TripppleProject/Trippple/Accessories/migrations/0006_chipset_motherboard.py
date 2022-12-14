# Generated by Django 4.1.3 on 2022-11-26 21:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Accessories', '0005_alter_videomemorytypes_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chipset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=150, verbose_name='Чипсет')),
            ],
            options={
                'verbose_name': 'Чипсет',
                'verbose_name_plural': 'Чипсет',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Motherboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(db_index=True, max_length=150, verbose_name='Производитель')),
                ('MBmodel', models.CharField(db_index=True, max_length=150, verbose_name='Модель')),
                ('countslotsRAM', models.IntegerField(verbose_name='Количество слотов памяти')),
                ('maxAmountRAM', models.IntegerField(verbose_name='Максимальный объем памяти')),
                ('is_SSD', models.BooleanField(verbose_name='Have SSD?')),
                ('chipset_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Accessories.chipset', verbose_name='ID Чипсета')),
                ('connectiontype', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Accessories.connectionstypes', verbose_name='Интерфейс подключения')),
                ('socket_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Accessories.socket', verbose_name='ID Сокета')),
                ('typememory_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Accessories.videomemorytypes', verbose_name='Тип памяти')),
            ],
            options={
                'verbose_name': 'Материнская плата',
                'verbose_name_plural': 'Материнские платы',
                'ordering': ['MBmodel'],
            },
        ),
    ]
