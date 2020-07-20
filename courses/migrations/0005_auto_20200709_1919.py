# Generated by Django 3.0.4 on 2020-07-09 16:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_auto_20200709_1858'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Course',
            new_name='MentorCourse',
        ),
        migrations.AlterField(
            model_name='interestedstudent',
            name='Student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='courses.UserInfo'),
        ),
        migrations.AlterField(
            model_name='mentorcourse',
            name='Mentor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='courses.UserInfo'),
        ),
    ]
