# Generated by Django 3.0.4 on 2020-07-11 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0010_auto_20200711_1259'),
    ]

    operations = [
        migrations.AddField(
            model_name='mentorcourse',
            name='courseYear',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
