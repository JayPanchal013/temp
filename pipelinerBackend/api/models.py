from django.db import models
from django.utils.html import mark_safe
import os


def sample_path(instance, filename):
    return os.path.join("projects", instance.fabricName, "samples", filename)


def image_path(instance, filename):
    return os.path.join(
        "projects",
        instance.fabric.fabricName,
        "datasets",
        instance.dataset.datasetName,
        instance.imageType,
        "images",
        filename,
    )


def label_path(instance, filename):
    return os.path.join(
        "projects",
        instance.fabric.fabricName,
        "datasets",
        instance.dataset.datasetName,
        instance.imageType,
        "labels",
        filename,
    )


# Create your models here.
class Basemodel(models.Model):
    modelName = models.CharField(max_length=100, default="", blank=True)
    modelType = models.CharField(max_length=100, default="", blank=True)

    def __str__(self):
        return self.modelName


class Fabric(models.Model):
    fabricName = models.CharField(max_length=100, default="", blank=True)
    fabricDescription = models.CharField(max_length=1000, default="", blank=True)
    GSM = models.CharField(max_length=100, default="", blank=True)
    color = models.CharField(max_length=100, default="", blank=True)
    fabricType = models.CharField(max_length=100, default="", blank=True)
    material = models.CharField(max_length=100, default="", blank=True)
    sampleImages = models.ImageField(upload_to=sample_path, default="", blank=True)
    labels = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.fabricName

    def fabricPhoto(self):
        return mark_safe(
            f'<img src="/static{self.sampleImages.name.replace("projects","")}" width = "50"/>'
        )


class Dataset(models.Model):
    fabric = models.ForeignKey(Fabric, on_delete=models.CASCADE)
    datasetName = models.CharField(max_length=100, default="", blank=True)
    tasks = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.datasetName


class YoloModel(models.Model):
    fabric = models.ForeignKey(Fabric, on_delete=models.CASCADE)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    baseModel = models.ForeignKey(Basemodel, on_delete=models.CASCADE)
    modelName = models.CharField(max_length=100, default="", blank=True)
    epochs = models.IntegerField(default=10)
    imgsz = models.IntegerField(default=640)

    def __str__(self):
        return self.modelName


class Annotator(models.Model):
    annotatorId = models.CharField(max_length=100, default="", blank=True)
    annotatorName = models.CharField(max_length=100, default="", blank=True)
    annotatorEmail = models.CharField(max_length=100, default="", blank=True)

    def __str__(self):
        return self.annotatorName


class Imagegallery(models.Model):
    fabric = models.ForeignKey(Fabric, on_delete=models.CASCADE)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    imageType = models.CharField(max_length=100, default="", blank=True)
    image = models.ImageField(upload_to=image_path, default="", blank=True)
    imageLabel = models.FileField(upload_to=label_path, default="", blank=True)

    # annotator = models.ForeignKey(Annotator, on_delete=models.CASCADE)
    def __str__(self):
        return self.imageType


class PredictionData(models.Model):
    fabric = models.ForeignKey(Fabric, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    centroid = models.CharField(max_length=100, default="", blank=True)
    boundingBox = models.CharField(max_length=100, default="", blank=True)
    imageRaw = models.CharField(max_length=500, default="", blank=True)
    imageAnnotated = models.CharField(max_length=500, default="", blank=True)
    confidence = models.FloatField(default=0.0, blank=True)

    def image1(self):
        return mark_safe(
            f'<img src="/static{self.imageRaw.replace("projects","")}" width = "50"/>'
        )

    def image2(self):
        return mark_safe(
            f'<img src="/static{self.imageAnnotated.replace("projects","")}" width = "50"/>'
        )
