# Generated by Django 3.0.5 on 2021-08-08 14:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210808_1254'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='device',
            name='parser',
        ),
        migrations.CreateModel(
            name='Parser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parser', models.TextField()),
                ('deviceId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Device', to_field='deviceId')),
            ],
        ),
    ]