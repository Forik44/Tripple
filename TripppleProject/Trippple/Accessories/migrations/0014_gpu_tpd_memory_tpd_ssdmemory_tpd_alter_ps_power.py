# Generated by Django 4.1.3 on 2022-12-05 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accessories', '0013_ps_alter_ssdmemory_speedmemread_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='gpu',
            name='TPD',
            field=models.IntegerField(default=100, verbose_name='TPD'),
        ),
        migrations.AddField(
            model_name='memory',
            name='TPD',
            field=models.IntegerField(default=20, verbose_name='TPD'),
        ),
        migrations.AddField(
            model_name='ssdmemory',
            name='TPD',
            field=models.IntegerField(default=20, verbose_name='TPD'),
        ),
        migrations.AlterField(
            model_name='ps',
            name='power',
            field=models.IntegerField(verbose_name='Мощность'),
        ),
    ]
