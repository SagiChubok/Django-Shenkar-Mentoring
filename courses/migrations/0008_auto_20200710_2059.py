# Generated by Django 3.0.4 on 2020-07-10 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0007_auto_20200709_1958'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userinfo',
            old_name='mail',
            new_name='email',
        ),
    ]