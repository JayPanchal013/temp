# Generated by Django 4.1.4 on 2023-07-08 16:37

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="imagegallery", name="annotator",),
        migrations.CreateModel(
            name="PredictionData",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("time", models.DateTimeField(auto_now_add=True)),
                ("centroid", models.JSONField(blank=True, default=dict)),
                ("boundingBox", models.JSONField(blank=True, default=dict)),
                (
                    "imageAnnotated",
                    models.ImageField(
                        blank=True, default="", upload_to=api.models.image_path
                    ),
                ),
                (
                    "fabric",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.fabric"
                    ),
                ),
                (
                    "imageRaw",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.imagegallery",
                    ),
                ),
            ],
        ),
    ]