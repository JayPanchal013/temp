# Generated by Django 4.1.4 on 2023-07-08 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_remove_imagegallery_annotator_predictiondata"),
    ]

    operations = [
        migrations.AlterField(
            model_name="predictiondata",
            name="imageAnnotated",
            field=models.CharField(blank=True, default="", max_length=500),
        ),
        migrations.AlterField(
            model_name="predictiondata",
            name="imageRaw",
            field=models.CharField(blank=True, default="", max_length=500),
        ),
    ]
