# Generated by Django 5.0.4 on 2024-04-24 23:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(default=0)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='claps', to='api.post')),
            ],
        ),
    ]
