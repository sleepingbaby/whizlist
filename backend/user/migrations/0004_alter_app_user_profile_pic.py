# Generated by Django 4.2.4 on 2023-08-15 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_app_user_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='app_user',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
