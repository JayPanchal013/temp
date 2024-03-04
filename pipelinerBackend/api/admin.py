from django.contrib import admin
from .models import (
    Basemodel,
    Fabric,
    Dataset,
    YoloModel,
    Annotator,
    Imagegallery,
    PredictionData,
)
from import_export.admin import ExportActionMixin


class BasemodelAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ("modelName", "modelType")
    search_fields = ["modelName", "modelType"]


class FabricAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = (
        "fabricName",
        "fabricDescription",
        "GSM",
        "color",
        "fabricType",
        "material",
        "fabricPhoto",
    )
    search_fields = [
        "fabricName",
        "fabricDescription",
        "GSM",
        "color",
        "fabricType",
        "material",
    ]


class DatasetAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ("id", "fabric", "datasetName")
    search_fields = ["id", "fabric__fabricName", "datasetName"]


class YoloModelAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = (
        "fabric",
        "dataset",
        "baseModel",
        "modelName",
        "epochs",
        "imgsz",
    )
    search_fields = [
        "fabric",
        "dataset",
        "baseModel",
        "modelName",
        "epochs",
        "imgsz",
    ]


class AnnotatorAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ("annotatorId", "annotatorName", "annotatorEmail")
    search_fields = ["annotatorId", "annotatorName", "annotatorEmail"]


class ImagegalleryAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = (
        "fabric",
        "dataset",
        "imageType",
        "image",
        "imageLabel",
    )
    search_fields = [
        "fabric",
        "dataset",
        "imageType",
        "image",
        "imageLabel",
    ]


class PredictionDataAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = (
        "fabric",
        "time",
        "centroid",
        "boundingBox",
        "image1",
        "image2",
        "confidence",
    )
    search_fields = ["fabric", "time", "centroid", "boundingBox", "confidence"]


admin.site.register(Basemodel, BasemodelAdmin)
admin.site.register(Fabric, FabricAdmin)
admin.site.register(Dataset, DatasetAdmin)
admin.site.register(YoloModel, YoloModelAdmin)
admin.site.register(Annotator, AnnotatorAdmin)
admin.site.register(Imagegallery, ImagegalleryAdmin)
admin.site.register(PredictionData, PredictionDataAdmin)
