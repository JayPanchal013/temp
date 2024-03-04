from django.shortcuts import render, redirect, HttpResponseRedirect
from django.http import HttpResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from cvat_sdk import make_client
from cvat_sdk.core.proxies.tasks import ResourceType, Task
import datumaro as dm
from cvat_sdk.core.proxies.projects import Project
from .models import (
    Basemodel,
    Fabric,
    Dataset,
    YoloModel,
    Annotator,
    Imagegallery,
    PredictionData,
)
import json
import zipfile
import os
from datetime import datetime

import psutil

import threading
from ultralytics import YOLO
import torch
from PIL import ImageDraw, Image
import numpy as np
import matplotlib.pyplot as plt
import cv2
import io
import csv
import random
import base64
import time
from threading import Thread
import genicam.genapi as ge
from harvesters.core import Harvester


width = int(4096)
height = int(2176)
h = Harvester()
h.add_file("D:/Balluff/ImpactAcquire/bin/x64/mvGenTLProducer.cti")
h.update()


predictPath = ""
predictModel = None
predictFolder = ""
os.environ["WANDB_DISABLED"] = "true"
realtimePredict = False
caps = {}
cameraSetting = {}
try:
    device = torch.device("cuda")
except:
    device = torch.device("cpu")

try:
    with make_client(host="app.cvat.ai", credentials=("basappa", "Tipl@123")) as client:
        CVATClient = client
except:
    print("CVAT SDK Not Loaded")


def createProject(name, labels):
    project_spec = {
        "name": name,
        "labels": labels,
        "target_storage": {"location": "local"},
        "source_storage": {"location": "local"},
    }
    newProject = client.projects.create(spec=project_spec)
    return newProject


def createTask(name, subset, projectId, data):
    task_spec = {
        "name": name,
        "assignee_id": 33017,
        "project_id": projectId,
        "subset": subset,
    }
    task = client.tasks.create_from_data(
        spec=task_spec, resource_type=ResourceType.LOCAL, resources=data
    )
    return task


# Disable CSRF protection for the view
@csrf_exempt
def extractFolder(request):
    # Check if the request method is POST and if the "dataset" file was uploaded
    if request.method == "POST":
        if request.FILES.get("dataset", False):
            # Check if a project name was provided
            projectName = request.POST["projectName"]
            # Get the uploaded file and the project name from the request
            dataset = request.FILES["dataset"]
            # Check if a dataset name was provided
            datasetName = request.POST["datasetName"]
            if projectName != "":
                if request.POST.get("datasetName", False):
                    print(datasetName)
                    # create a new temp folder
                    extract_folder = str(datetime.now().strftime("%Y-%m-%d-%H-%M-%S"))
                    temp_folder = "temp/" + projectName + "/"
                    target_folder = (
                        "projects/" + projectName + "/datasets/" + datasetName + "/"
                    )
                    project = Fabric.objects.filter(fabricName=projectName).first()
                    # Extract the files from the zip file to the target folder
                    with zipfile.ZipFile(dataset, "r") as zip_ref:
                        zip_ref.extractall(os.path.join(temp_folder, extract_folder))

                    # get the list of images in the test folder
                    dataset = dm.Dataset.import_from(
                        temp_folder + extract_folder + "/", "open_images"
                    )

                    dataset.export(
                        temp_folder + extract_folder + "/yolo/",
                        "yolo_ultralytics",
                        save_media=False,
                    )

                    # copy all folders and files from the temp_folder + extract_folder + "/yolo/labels" to the target folder
                    for file in os.listdir(
                        temp_folder + extract_folder + "/yolo/labels/test/"
                    ):
                        with open(
                            temp_folder + extract_folder + "/yolo/labels/test/" + file,
                            "rb",
                        ) as f:
                            with open(
                                target_folder + "test/labels/" + file, "wb+"
                            ) as target:
                                target.write(f.read())
                    for file in os.listdir(
                        temp_folder + extract_folder + "/yolo/labels/train/"
                    ):
                        with open(
                            temp_folder + extract_folder + "/yolo/labels/train/" + file,
                            "rb",
                        ) as f:
                            with open(
                                target_folder + "train/labels/" + file, "wb+"
                            ) as target:
                                target.write(f.read())
                    for file in os.listdir(
                        temp_folder + extract_folder + "/yolo/labels/val/"
                    ):
                        with open(
                            temp_folder + extract_folder + "/yolo/labels/val/" + file,
                            "rb",
                        ) as f:
                            with open(
                                target_folder + "valid/labels/" + file, "wb+"
                            ) as target:
                                target.write(f.read())
                    with open(
                        temp_folder + extract_folder + "/yolo/data.yaml",
                        "r",
                    ) as f:
                        lines = f.readlines()
                        lines[0] = "train: ../train/images\n"
                        lines[1] = "val: ../valid/images\n"
                        lines[2] = "test: ../test/images\n"
                        with open(
                            target_folder + "data.yaml",
                            "w",
                        ) as target:
                            target.writelines(lines)

                    return HttpResponse(
                        json.dumps({"success": "File extracted successfully!"}),
                        content_type="application/json",
                    )
                else:
                    # Create a folder name based on the current date and time
                    extract_folder = str(datetime.now().strftime("%Y-%m-%d-%H-%M-%S"))
                    # Set the target folder for the extracted files
                    target_folder = "projects/" + projectName + "/datasets/"
                    project = Fabric.objects.filter(fabricName=projectName).first()
                    # Extract the files from the zip file to the target folder
                    with zipfile.ZipFile(dataset, "r") as zip_ref:
                        zip_ref.extractall(os.path.join(target_folder, extract_folder))
                    imagesTest = os.listdir(
                        target_folder + extract_folder + "/test/images/"
                    )
                    imagesTrain = os.listdir(
                        target_folder + extract_folder + "/train/images/"
                    )
                    imagesValid = os.listdir(
                        target_folder + extract_folder + "/valid/images/"
                    )
                    images = []
                    for i in range(len(imagesTest)):
                        images.append(
                            target_folder
                            + extract_folder
                            + "/test/images/"
                            + imagesTest[i]
                        )
                    testTask = createTask(
                        extract_folder + "_test", "test", project.id, images
                    )
                    images = []
                    for i in range(len(imagesTrain)):
                        images.append(
                            target_folder
                            + extract_folder
                            + "/train/images/"
                            + imagesTrain[i]
                        )
                    trainTask = createTask(
                        extract_folder + "_train", "train", project.id, images
                    )
                    images = []
                    for i in range(len(imagesValid)):
                        images.append(
                            target_folder
                            + extract_folder
                            + "/valid/images/"
                            + imagesValid[i]
                        )
                    validTask = createTask(
                        extract_folder + "_valid", "valid", project.id, images
                    )
                    newDataset = Dataset()
                    newDataset.fabric = project
                    newDataset.datasetName = extract_folder
                    newDataset.tasks = json.dumps(
                        {
                            "test": testTask.id,
                            "train": trainTask.id,
                            "valid": validTask.id,
                        }
                    )
                    newDataset.save()
                    # Return a success message if the extraction was successful
                    return HttpResponse(
                        json.dumps({"success": "File extracted successfully!"}),
                        content_type="application/json",
                    )
            else:
                # Return an error message if no project name was provided
                return HttpResponse(
                    json.dumps({"error": "No project name found"}),
                    content_type="application/json",
                )
        else:
            # Return an error message if no file was found in the request
            return HttpResponse(
                json.dumps({"error": "No file found"}), content_type="application/json"
            )


# Define a view that returns system information
def sysInfo(request):
    # Get RAM usage
    ram = psutil.virtual_memory()
    ram_usage = ram.percent

    # Get CPU usage
    cpu_usage = psutil.cpu_percent(interval=1)

    # Create a dictionary containing the system information
    data = {"ram": ram_usage, "cpu": cpu_usage}
    # Return the system information as a JSON object
    return HttpResponse(json.dumps(data), content_type="application/json")


# Define a view that returns a list of project folders
def projectFecther(request):
    try:
        # Initialize an empty list to store the project folders
        folders = []
        # Loop through all files and folders in the "projects" directory
        for folder in os.listdir("projects"):
            # Check if the current item is a directory
            if os.path.isdir("projects/" + folder):
                # If it is, add it to the list of project folders
                folders.append(folder)
        # Return the list of project folders as a JSON object
        return HttpResponse(
            json.dumps({"data": folders}), content_type="application/json"
        )
    except Exception as e:
        # If an error occurs, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": str(e)}), content_type="application/json"
        )


def projectDetails(request):
    try:
        data = []

        fabrics = Fabric.objects.all()
        # for folder in os.listdir("projects"):
        for fabric in fabrics:
            if os.path.isdir("projects/" + fabric.fabricName):
                datasetCount = 0
                for item in os.listdir("projects/" + fabric.fabricName + "/datasets"):
                    item_path = os.path.join(
                        "projects/" + fabric.fabricName + "/datasets", item
                    )
                    if os.path.isdir(item_path):
                        datasetCount += 1

                modelCount = 0
                for item in os.listdir("projects/" + fabric.fabricName + "/models"):
                    item_path = os.path.join(
                        "projects/" + fabric.fabricName + "/models", item
                    )
                    if os.path.isdir(item_path):
                        modelCount += 1

                sampleImages = []

                for item in os.listdir("projects/" + fabric.fabricName + "/samples"):
                    item_path = os.path.join(
                        "projects/" + fabric.fabricName + "/samples", item
                    )
                    if os.path.isfile(item_path):
                        sampleImages.append(fabric.fabricName + "/samples/" + item)

                temp = {
                    "id": fabric.id,
                    "name": fabric.fabricName,
                    "datasetCount": datasetCount,
                    "modelCount": modelCount,
                    "sampleImages": sampleImages,
                }
                data.append(temp)
        # Return the list of project folders as a JSON object
        return HttpResponse(json.dumps({"data": data}), content_type="application/json")
    except Exception as e:
        # If an error occurs, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": str(e)}), content_type="application/json"
        )


# Define a view that returns a list of dataset folders for a specific project
@csrf_exempt
def datasetFecther(request):
    try:
        # Get the project name from the request
        project = request.GET["project"]
        # Initialize an empty list to store the dataset folders
        folders = []
        # Loop through all files and folders in the "datasets" directory for the specified project
        for folder in os.listdir("projects/" + project + "/datasets"):
            # Check if the current item is a directory
            if os.path.isdir("projects/" + project + "/datasets/" + folder):
                # If it is, add it to the list of dataset folders
                folders.append(folder)
        # Return the list of dataset folders as a JSON object
        return HttpResponse(
            json.dumps({"data": folders}), content_type="application/json"
        )
    except Exception as e:
        # If an error occurs, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": str(e)}), content_type="application/json"
        )


# Define a view that returns a list of model folders for a specific project
def modelFecther(request):
    try:
        # Get the project name from the request
        project = request.GET["project"]
        folders = []

        # Initialize an empty list to store the model folders
        # folders = []
        # Loop through all files and folders in the "models" directory for the specified project
        for folder in os.listdir("projects/" + project + "/models"):
            # Check if the current item is a directory
            if os.path.isdir("projects/" + project + "/models/" + folder):
                # If it is, add it to the list of model folders
                folders.append(folder)
        # Return the list of model folders as a JSON object
        return HttpResponse(
            json.dumps({"data": folders}), content_type="application/json"
        )
    except Exception as e:
        # If an error occurs, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": str(e)}), content_type="application/json"
        )


# Define a view that returns a list of base model folders
def basemodelFecther(request):
    try:
        project = request.GET.get("project", False)
        folders = {"baseModel": [], "projectModel": []}

        if os.path.isdir("projects/" + str(project)):
            for folder in os.listdir("projects/" + project + "/models"):
                folders["projectModel"].append(folder)
        # Loop through all files and folders in the "models" directory for the specified project
        # Initialize an empty list to store the base model folders

        # Loop through all files and folders in the "baseModels" directory
        for folder in os.listdir("baseModels"):
            if "yolo" in folder:
                folders["baseModel"].append(folder)
        # Return the list of base model folders as a JSON object
        return HttpResponse(
            json.dumps({"data": folders}), content_type="application/json"
        )
    except Exception as e:
        # If an error occurs, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": str(e)}), content_type="application/json"
        )


# Define a view that returns a list of images for a specific dataset and project
def imageGallery(request):
    try:
        # Get the project and dataset names from the request
        project = request.GET["project"]
        dataset = request.GET["dataset"]
        # Initialize an empty dictionary to store the image paths
        data = {}
        # Define the paths to the test, train, and validation image folders
        testPath = "projects/" + project + "/datasets/" + dataset + "/test/images/"
        trainPath = "projects/" + project + "/datasets/" + dataset + "/train/images/"
        validPath = "projects/" + project + "/datasets/" + dataset + "/valid/images/"
        # Initialize empty lists for the test, train, and validation image paths
        data["test"] = []
        data["train"] = []
        data["valid"] = []
        # Add the image paths to the corresponding lists
        for image in os.listdir(testPath):
            data["test"].append(
                project + "/datasets/" + dataset + "/test/images/" + image
            )
        for image in os.listdir(trainPath):
            data["train"].append(
                project + "/datasets/" + dataset + "/train/images/" + image
            )
        for image in os.listdir(validPath):
            data["valid"].append(
                project + "/datasets/" + dataset + "/valid/images/" + image
            )
        # Add the project and dataset names to the dictionary
        data["project"] = project
        data["dataset"] = dataset
        # Return the dictionary as a JSON object
        return HttpResponse(json.dumps(data), content_type="application/json")
    except Exception as e:
        # If an error occurs, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": str(e)}), content_type="application/json"
        )


# Define a view that trains a YOLO model
# Disable CSRF protection for the view
@csrf_exempt
def modelTraining(request):
    # If the request method is POST
    if request.method == "POST":
        try:
            # Get the project, dataset, epochs, base model, image size, and name from the request
            project = request.POST["projectName"]
            datasetName = request.POST["datasetName"]
            epochs = request.POST["epochs"]
            baseModel = request.POST["baseModel"]
            imgsz = request.POST["imgsz"]
            name = request.POST["name"]
            resume = request.POST["resume"]
            baseDir = os.getcwd()
            if resume == "true":
                resume = True
                model = YOLO(
                    "projects/" + project + "/models/" + name + "/weights/best.pt"
                )
                name = baseModel
            else:
                resume = False
                # Initialize a YOLO model with the specified base model
                model = YOLO("baseModels/" + baseModel)
            # Train the model using the specified parameters
            model.train(
                data=baseDir
                + "/projects/"
                + project
                + "/datasets/"
                + datasetName
                + "/data.yaml",
                epochs=int(epochs),
                imgsz=int(imgsz),
                name=name,
                batch=-1,
                task="segment",
                save_dir=baseDir + "/projects/" + project + "/models/",
                resume=resume,
                device=device,
            )
            # Return a success message as a JSON object
            return HttpResponse(
                json.dumps({"success": "Model Trained "}),
                content_type="application/json",
            )
        except Exception as e:
            print(e)
            # If an error occurs, return an error message as a JSON object
            return HttpResponse(
                json.dumps({"error": str(e)}), content_type="application/json"
            )
    else:
        # If the request is not a POST request, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": "Invalid Request"}), content_type="application/json"
        )


# Define a view that predicts object detection on an image using a YOLO model
# Disable CSRF protection for the view
@csrf_exempt
def modelPrediction(request):
    if request.method == "POST":

        # Initialize variables for the prediction path, model, and folder
        global predictPath, predictModel, predictFolder, caps
        results = []
        # Get the project name, model name, and input source from the request
        project = request.POST["projectName"]
        modelName = request.POST["modelName"]
        inputSource = request.POST["inputSource"]
        # Check if the input source is an uploaded image
        if inputSource == "image":
            # If it is, save the image to the project's images directory
            image = request.FILES["image"]
            # save the image to the project's images directory
            with open("projects/" + project + "/images/" + image.name, "wb+") as f:
                f.write(image.read())
            # image.save("projects/" + project + "/images/" + image.filename)
            # Check if the current model is different from the previous prediction model
            if (
                "projects/" + project + "/models/" + modelName + "/weights/best.pt"
                != predictPath
            ):
                # If it is, update the prediction path, model, and folder
                predictPath = (
                    "projects/" + project + "/models/" + modelName + "/weights/best.pt"
                )
                predictModel = YOLO(
                    "projects/" + project + "/models/" + modelName + "/weights/best.pt"
                )
                predictFolder = datetime.now().strftime("%Y-%m-%d-%H%M%S")
            try:
                # Predict the objects in the image using the YOLO model
                results = predictModel(
                    "projects/" + project + "/images/" + image.name,
                    retina_masks=True,
                    iou=0.1,
                    conf=0.3,
                    imgsz=640,
                    project="projects/" + project + "/predicts/",
                    name=predictFolder,
                    save=True,
                    show_conf=False,
                    show_labels=False,
                    show_boxes=False,
                )
                for result in results:
                    orignalPath = result.path
                    path = (
                        "projects/"
                        + project
                        + "/predicts/"
                        + predictFolder
                        + "/"
                        + image.name
                    )
                    imageCv = cv2.imread(path)
                    for box in result.boxes:
                        boxCor = box.xyxy.tolist()[0]
                        centerX = boxCor[0] + ((boxCor[2] - boxCor[0]) / 2)
                        centerY = boxCor[1] + ((boxCor[3] - boxCor[1]) / 2)
                        confident = box.conf.tolist()[0]
                        # plot the point on the image
                        imageHeight, imageWidth, _ = imageCv.shape
                        imageCv = cv2.circle(
                            imageCv,
                            (int(centerX), int(centerY)),
                            10,
                            (0, 255, 255),
                            10,
                        )
                        imageCv = cv2.rectangle(
                            imageCv,
                            (int(boxCor[0]), int(boxCor[1])),
                            (int(boxCor[2]), int(boxCor[3])),
                            (0, 255, 255),
                            1,
                        )
                        imageCv = cv2.putText(
                            imageCv,
                            str(confident)[:4],
                            (int(boxCor[0]), int(boxCor[1]) - 5),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            1,
                            (0, 255, 255),
                            2,
                            cv2.LINE_AA,
                        )
                        newPredict = PredictionData()
                        newPredict.fabric = Fabric.objects.filter(
                            fabricName=project
                        ).first()
                        newPredict.centroid = str(centerX)[:4] + "," + str(centerY)[:4]
                        newPredict.boundingBox = (
                            str(boxCor[0])[:4]
                            + ","
                            + str(boxCor[1])[:4]
                            + ","
                            + str(boxCor[2])[:4]
                            + ","
                            + str(boxCor[3])[:4]
                        )
                        newPredict.imageRaw = (
                            "projects/" + project + "/images/" + image.name
                        )
                        newPredict.imageAnnotated = path
                        newPredict.confidence = confident
                        newPredict.save()
                    # save the image
                    cv2.imwrite(path, imageCv)
                return HttpResponse(
                    json.dumps(
                        {
                            "path": project
                            + "/predicts/"
                            + predictFolder
                            + "/"
                            + image.name,
                            "results": str(results),
                        }
                    ),
                    content_type="application/json",
                )
            except Exception as e:
                return HttpResponse(
                    json.dumps(
                        {
                            "error": str(e),
                            "status": "error",
                        }
                    ),
                    content_type="application/json",
                )
        else:
            # If no input source is provided, return an error message as a JSON object
            return HttpResponse(
                json.dumps({"error": "No Input Source Provided"}),
                content_type="application/json",
            )
    else:
        # If an invalid request is made, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": "Invalid Request"}), content_type="application/json"
        )


def webcam(cameraIndex, project, modelName):
    global predictPath, predictModel, predictFolder, caps, realtimePredict, cameraSetting
    cameraSetting["Camera" + str(cameraIndex)] = {
        "exposure": 25,
        "saturation": 1.0,
        "contrast": 1.0,
    }
    try:
        caps["Camera" + str(cameraIndex)] = cv2.VideoCapture(int(cameraIndex))
    except:
        try:
            caps["Camera" + str(cameraIndex)] = cv2.VideoCapture(
                "/dev/video" + str(cameraIndex)
            )
        except:
            pass
    while True:
        success, image = caps["Camera" + str(cameraIndex)].read()
        if success:
            image_np = np.array(image)
            image_np = cv2.convertScaleAbs(
                image_np,
                alpha=cameraSetting["Camera" + str(cameraIndex)]["contrast"],
                beta=cameraSetting["Camera" + str(cameraIndex)]["exposure"],
            )
            hsv = cv2.cvtColor(image_np, cv2.COLOR_RGB2HSV)
            hsv[:, :, 1] = (
                hsv[:, :, 1] * cameraSetting["Camera" + str(cameraIndex)]["saturation"]
            )
            image_np = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)
            if realtimePredict:
                if (
                    "projects/" + project + "/models/" + modelName + "/weights/best.pt"
                    != predictPath
                ):
                    # If it is, update the prediction path, model, and folder
                    predictPath = (
                        "projects/"
                        + project
                        + "/models/"
                        + modelName
                        + "/weights/best.pt"
                    )
                    predictModel = YOLO(
                        "projects/"
                        + project
                        + "/models/"
                        + modelName
                        + "/weights/best.pt"
                    )
                results = predictModel(
                    source=image_np,
                    iou=0.1,
                    conf=0.3,
                    imgsz=256,
                    save=False,
                    # show_conf=True,
                    # show_labels=True,
                    # show_boxes=True,
                )

                for result in results:
                    for box in result.boxes:
                        boxCor = box.xyxy.tolist()[0]
                        centerX = boxCor[0] + ((boxCor[2] - boxCor[0]) / 2)
                        centerY = boxCor[1] + ((boxCor[3] - boxCor[1]) / 2)
                        confident = box.conf.tolist()[0]
                        # plot the point on the image
                        imageHeight, imageWidth, _ = image_np.shape
                        image_np = cv2.circle(
                            image_np,
                            (int(centerX), int(centerY)),
                            10,
                            (0, 255, 255),
                            10,
                        )
                        image_np = cv2.rectangle(
                            image_np,
                            (int(boxCor[0]), int(boxCor[1])),
                            (int(boxCor[2]), int(boxCor[3])),
                            (0, 255, 255),
                            1,
                        )
                        image_np = cv2.putText(
                            image_np,
                            str(confident)[:4],
                            (int(boxCor[0]), int(boxCor[1]) + 5),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            1,
                            (0, 255, 255),
                            2,
                            cv2.LINE_AA,
                        )

            # convert the image to base64
            _, img_encoded = cv2.imencode(".jpg", np.array(image_np))
            img_bytes = img_encoded.tobytes()
            yield (
                b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + img_bytes + b"\r\n"
            )
        else:
            caps["Camera" + str(cameraIndex)].release()


def mainCam(cameraIndex, project, modelName):
    global predictPath, predictModel, predictFolder, caps, realtimePredict, h, cameraSetting

    index = 0
    cameraSetting["Camera" + str(cameraIndex)] = {
        "exposure": 25,
        "saturation": 1.0,
        "contrast": 1.0,
    }
    for i in h.device_info_list:
        if i.serial_number == cameraIndex:
            break
        index = index + 1
    try:
        caps["Camera" + str(cameraIndex)] = h.create(index)
    except:
        h.update()
        caps["Camera" + str(cameraIndex)] = h.create(index)
    caps["Camera" + str(cameraIndex)].remote_device.node_map.Width.value = width
    caps["Camera" + str(cameraIndex)].remote_device.node_map.Height.value = height
    caps["Camera" + str(cameraIndex)].remote_device.node_map.PixelFormat.value = (
        "BayerRG8"
    )
    caps["Camera" + str(cameraIndex)].remote_device.node_map.ChunkSelector.value = (
        "ExposureTime"
    )
    caps["Camera" + str(cameraIndex)].remote_device.node_map.ExposureTime.set_value(
        8000.0
    )
    caps["Camera" + str(cameraIndex)].start()

    while True:
        with caps["Camera" + str(cameraIndex)].fetch() as buffer:
            component = buffer.payload.components[0]
            image_np = component.data.reshape(height, width)
            image_np = cv2.cvtColor(image_np, cv2.COLOR_BayerRG2RGB)
            image_np = cv2.resize(image_np, (int(width / 4), int(height / 4)))
            # increase the exposure
            image_np = cv2.convertScaleAbs(
                image_np,
                alpha=cameraSetting["Camera" + str(cameraIndex)]["contrast"],
                beta=cameraSetting["Camera" + str(cameraIndex)]["exposure"],
            )
            hsv = cv2.cvtColor(image_np, cv2.COLOR_RGB2HSV)
            hsv[:, :, 1] = (
                hsv[:, :, 1] * cameraSetting["Camera" + str(cameraIndex)]["saturation"]
            )
            image_np = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)

            if realtimePredict:
                if (
                    "projects/" + project + "/models/" + modelName + "/weights/best.pt"
                    != predictPath
                ):
                    # If it is, update the prediction path, model, and folder
                    predictPath = (
                        "projects/"
                        + project
                        + "/models/"
                        + modelName
                        + "/weights/best.pt"
                    )
                    predictModel = YOLO(
                        "projects/"
                        + project
                        + "/models/"
                        + modelName
                        + "/weights/best.pt"
                    )
                results = predictModel(
                    source=image_np,
                    iou=0.1,
                    conf=0.1,
                    imgsz=640,
                    save=False,
                    # show_conf=True,
                    # show_labels=True,
                    # show_boxes=True,
                )

                for result in results:
                    for box in result.boxes:
                        boxCor = box.xyxy.tolist()[0]
                        centerX = boxCor[0] + ((boxCor[2] - boxCor[0]) / 2)
                        centerY = boxCor[1] + ((boxCor[3] - boxCor[1]) / 2)
                        confident = box.conf.tolist()[0]
                        # plot the point on the image
                        imageHeight, imageWidth, _ = image_np.shape
                        image_np = cv2.circle(
                            image_np,
                            (int(centerX), int(centerY)),
                            10,
                            (0, 255, 255),
                            10,
                        )
                        image_np = cv2.rectangle(
                            image_np,
                            (int(boxCor[0]), int(boxCor[1])),
                            (int(boxCor[2]), int(boxCor[3])),
                            (0, 255, 255),
                            1,
                        )
                        image_np = cv2.putText(
                            image_np,
                            str(confident)[:4],
                            (int(boxCor[0]), int(boxCor[1]) + 5),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            1,
                            (0, 255, 255),
                            2,
                            cv2.LINE_AA,
                        )

            # convert the image to base64
            _, img_encoded = cv2.imencode(".jpg", np.array(image_np))
            img_bytes = img_encoded.tobytes()
            yield (
                b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + img_bytes + b"\r\n"
            )
    pass


@csrf_exempt
def realtimePrediction(request):
    cameraIndex = request.GET["cameraIndex"]
    project = request.GET["project"]
    modelName = request.GET["modelName"]
    try:
        cameraIndex = int(cameraIndex)
        # read the camera using opencv
        try:
            return StreamingHttpResponse(
                webcam(cameraIndex, project, modelName),
                content_type="multipart/x-mixed-replace;boundary=frame",
            )
        except Exception as e:
            image = open("static/error.png", "rb").read()
            return HttpResponse(
                image,
                content_type="image/png",
            )
    except:
        try:
            return StreamingHttpResponse(
                mainCam(cameraIndex, project, modelName),
                content_type="multipart/x-mixed-replace;boundary=frame",
            )
        except Exception as e:
            image = open("static/error.png", "rb").read()
            return HttpResponse(
                image,
                content_type="image/png",
            )


def toggleRealtimePrediction(request):
    global realtimePredict
    try:
        if realtimePredict:
            realtimePredict = False
        else:
            realtimePredict = True
        return HttpResponse(
            json.dumps(
                {
                    "status": "success",
                    "data": realtimePredict,
                }
            ),
            content_type="application/json",
        )
    except Exception as e:
        return HttpResponse(
            json.dumps(
                {
                    "status": "error",
                    "error": str(e),
                }
            ),
            content_type="application/json",
        )


def engageCamera(request, index):
    try:
        global caps
        try:
            index = int(index)
            caps["Camera" + str(index)] = cv2.VideoCapture(index)
        except:
            try:
                index = int(index)
                caps["Camera" + str(index)] = cv2.VideoCapture(
                    "/dev/video" + str(index)
                )
            except:
                pass
    except Exception as e:
        pass
    return HttpResponse(
        json.dumps(
            {
                "status": "success",
            }
        ),
        content_type="application/json",
    )


def disengageCamera(request, index):
    global caps
    try:
        caps["Camera" + str(index)].stop()
        caps["Camera" + str(index)].destroy()
    except Exception as e:
        try:
            caps["Camera" + str(index)].release()
        except:
            pass

    return HttpResponse(
        json.dumps(
            {
                "status": "success",
            }
        ),
        content_type="application/json",
    )


# Define a view that returns the details of a trained model
def modelDetails(request):
    try:
        # Get the project and model names from the request
        project = request.GET["project"]
        model = request.GET["model"]
        # Define the path to the results CSV file
        csvFile = "runs/segment/" + model + "/results.csv"
        # csvFile = "projects/" + project + "/models/" + model + "/results.csv"
        # Initialize an empty list to store the model details
        data = []
        # Open the CSV file and read the rows
        with open(csvFile) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=",")
            # For each row, extract the relevant data and append it to the list
            for row in csv_reader:
                temp = [
                    row[0].strip().replace(" ", ""),
                    row[5].strip().replace(" ", ""),
                    row[6].strip().replace(" ", ""),
                    row[7].strip().replace(" ", ""),
                    row[8].strip().replace(" ", ""),
                ]
                data.append(temp)
        # Return the model details as a JSON object
        return HttpResponse(
            json.dumps({"data": data[1:]}), content_type="application/json"
        )
    except Exception as e:
        # If an error occurs, return an error message as a JSON object
        return HttpResponse(
            json.dumps({"error": str(e)}), content_type="application/json"
        )


@csrf_exempt
def addNewFebric(request):
    if request.method == "POST":
        try:
            fabricName = request.POST["fabricName"]
            description = request.POST["fabricDetails"]
            images = request.FILES.getlist("images")
            dataset = request.FILES["dataset"]
            fabricType = request.POST["fabricType"]
            color = request.POST["fabricColor"]
            GSM = request.POST["fabricGSM"]
            material = request.POST["fabricMaterial"]
            fabricLabels = request.POST["fabricLabels"]

            baseDir = os.getcwd()
            folderPath = baseDir + "/projects/" + fabricName
            if not os.path.exists(folderPath):
                labels = [
                    {
                        "name": label[0],
                        "attributes": [],
                        "type": "polygon",
                        "color": label[1],
                    }
                    for label in json.loads(fabricLabels)
                ]
                project = createProject(fabricName, labels)

                os.mkdir(folderPath)
                os.mkdir(folderPath + "/datasets")
                os.mkdir(folderPath + "/images")
                os.mkdir(folderPath + "/models")
                os.mkdir(folderPath + "/predicts")
                os.mkdir(folderPath + "/samples")
                newFabric = Fabric()
                newFabric.id = project.id
                newFabric.fabricName = fabricName
                newFabric.fabricDescription = description
                newFabric.GSM = GSM
                newFabric.color = color
                newFabric.fabricType = fabricType
                newFabric.material = material
                newFabric.sampleImages = images[0]
                newFabric.labels = labels
                newFabric.save()

                for file in images:
                    with open(folderPath + "/samples/" + file.name, "wb+") as f:
                        f.write(file.read())

                des = folderPath + "/description.txt"
                with open(des, "w") as file:
                    file.write(description)

                if fabricName != "":
                    extract_folder = str(datetime.now().strftime("%Y-%m-%d-%H-%M-%S"))

                    target_folder = "./projects/" + fabricName + "/datasets/"
                    with zipfile.ZipFile(dataset, "r") as zip_ref:
                        zip_ref.extractall(os.path.join(target_folder, extract_folder))

                    imagesTest = os.listdir(
                        target_folder + extract_folder + "/test/images/"
                    )
                    imagesTrain = os.listdir(
                        target_folder + extract_folder + "/train/images/"
                    )
                    imagesValid = os.listdir(
                        target_folder + extract_folder + "/valid/images/"
                    )
                    images = []
                    for i in range(len(imagesTest)):
                        images.append(
                            target_folder
                            + extract_folder
                            + "/test/images/"
                            + imagesTest[i]
                        )
                    testTask = createTask(
                        extract_folder + "_test", "test", project.id, images
                    )
                    images = []
                    for i in range(len(imagesTrain)):
                        images.append(
                            target_folder
                            + extract_folder
                            + "/train/images/"
                            + imagesTrain[i]
                        )
                    trainTask = createTask(
                        extract_folder + "_train", "train", project.id, images
                    )
                    images = []
                    for i in range(len(imagesValid)):
                        images.append(
                            target_folder
                            + extract_folder
                            + "/valid/images/"
                            + imagesValid[i]
                        )
                    validTask = createTask(
                        extract_folder + "_valid", "valid", project.id, images
                    )
                    newDataset = Dataset()
                    newDataset.fabric = newFabric
                    newDataset.datasetName = extract_folder
                    newDataset.tasks = json.dumps(
                        {
                            "test": testTask.id,
                            "train": trainTask.id,
                            "valid": validTask.id,
                        }
                    )
                    newDataset.save()

                    # imagesTest = os.listdir(
                    #     folderPath + "/datasets/" + extract_folder + "/test/images/"
                    # )
                    # imagesTrain = os.listdir(
                    #     folderPath + "/datasets/" + extract_folder + "/train/images/"
                    # )
                    # labelsTrain = os.listdir(
                    #     folderPath + "/datasets/" + extract_folder + "/train/labels/"
                    # )
                    # imagesValid = os.listdir(
                    #     folderPath + "/datasets/" + extract_folder + "/valid/images/"
                    # )
                    # labelsValid = os.listdir(
                    #     folderPath + "/datasets/" + extract_folder + "/valid/labels/"
                    # )
                    # for image in imagesTest:
                    #     newImage = Imagegallery()
                    #     newImage.fabric = newFabric
                    #     newImage.dataset = newDataset
                    #     newImage.imageType = "test"
                    #     # read the image
                    #     tempImage = open(
                    #         folderPath
                    #         + "/datasets/"
                    #         + extract_folder
                    #         + "/test/images/"
                    #         + image,
                    #         "rb",
                    #     ).read()
                    #     newImage.image = tempImage
                    #     newImage.save()
                    #     print(image)
                    # for image in imagesTrain:
                    #     newImage = Imagegallery()
                    #     newImage.fabric = newFabric
                    #     newImage.dataset = newDataset
                    #     newImage.imageType = "train"
                    #     # read the image
                    #     tempImage = open(
                    #         folderPath
                    #         + "/datasets/"
                    #         + extract_folder
                    #         + "/train/images/"
                    #         + image,
                    #         "rb",
                    #     ).read()
                    #     newImage.image = tempImage
                    #     newImage.save()
                    #     print(image)
                    # for label in labelsTrain:
                    #     newImage = Imagegallery()
                    #     newImage.fabric = newFabric
                    #     newImage.dataset = newDataset
                    #     newImage.imageType = "train"
                    #     # read the image
                    #     tempImage = open(
                    #         folderPath
                    #         + "/datasets/"
                    #         + extract_folder
                    #         + "/train/labels/"
                    #         + label,
                    #         "rb",
                    #     ).read()
                    #     newImage.image = tempImage
                    #     newImage.save()
                    #     print(label)

                return HttpResponse(
                    json.dumps({"success": "Fabric Created successfully"}),
                    content_type="application/json",
                )
            else:
                return HttpResponse(
                    json.dumps({"error": "Fabric Already exists."}),
                    content_type="application/json",
                )
        except Exception as e:
            return HttpResponse(
                json.dumps({"error": str(e)}),
                content_type="application/json",
            )
    else:
        return HttpResponse(
            json.dumps({"error": "Invalid Request"}),
            content_type="application/json",
        )


# Define a view that returns the details of a fabric
def getFebricDetails(request):
    try:
        # Get the fabric name from the request
        fabricName = request.GET["fabricName"]
        # Define the path to the fabric folder
        folderPath = "./projects/" + fabricName
        description = ""
        # Read the description from the description.txt file in the fabric folder
        with open(folderPath + "/description.txt", "r") as file:
            description = file.read()
        images = []
        # Get the list of images in the samples folder of the fabric
        for image in os.listdir(folderPath + "/samples"):
            images.append(fabricName + "/samples/" + image)
        # Return the fabric description and images as a JSON object
        return HttpResponse(
            json.dumps({"description": description, "images": images}),
            content_type="application/json",
        )
    except Exception as e:
        # If an error occurs, return an empty description and image list as a JSON object
        return HttpResponse(
            json.dumps({"description": "", "images": []}),
            content_type="application/json",
        )


def taskDetails(request):
    try:
        project = request.GET["project"]
        dataset = request.GET["dataset"]
        task = Dataset.objects.filter(
            fabric=Fabric.objects.filter(fabricName=project).first(),
            datasetName=dataset,
        ).first()
        labels = task.fabric.labels
        return HttpResponse(
            json.dumps({"tasks": json.loads(task.tasks), "labels": labels}),
            content_type="application/json",
        )
    except Exception as e:
        return HttpResponse(
            json.dumps({"error": str(e)}),
            content_type="application/json",
        )


def AnnotatorDetails(request):
    try:
        annotators = Annotator.objects.all()
        annotatorList = []
        for annotator in annotators:
            annotatorList.append([annotator.annotatorId, annotator.annotatorName])
        return HttpResponse(
            json.dumps({"data": annotatorList}),
            content_type="application/json",
        )
    except Exception as e:
        return HttpResponse(
            json.dumps({"error": str(e)}),
            content_type="application/json",
        )


@csrf_exempt
def AnnotatorAllocation(request):
    if request.method == "POST":
        try:
            annotatorId = request.POST.get("annotatorId")
            annotatorRole = request.POST.get("annotatorRole")
            project = request.POST.get("projectName")
            datasetName = request.POST.get("datasetName")
            project = Fabric.objects.filter(fabricName=project).first()
            task = Dataset.objects.filter(
                fabric=project, datasetName=datasetName
            ).first()
            taskCvat = client.tasks.retrieve(json.loads(task.tasks)[annotatorRole])
            taskCvat.update({"assignee_id": int(annotatorId)})
            return HttpResponse(
                json.dumps({"success": "Annotator Assigned successfully"}),
                content_type="application/json",
            )
        except Exception as e:
            return HttpResponse(
                json.dumps({"error": str(e)}), content_type="application/json"
            )


@csrf_exempt
def projectDetailsFetch(request):
    projectId = request.GET.get("projectID")
    fabric = Fabric.objects.filter(id=projectId).first()
    data = {}
    fname = fabric.fabricName
    data["fabricName"] = fname
    data["fabricDescription"] = fabric.fabricDescription
    data["GSM"] = fabric.GSM
    data["color"] = fabric.color
    data["fabricType"] = fabric.fabricType
    data["material"] = fabric.material
    data["labels"] = fabric.labels
    data["images"] = []

    # list all folder names in projects/fabric.fabricName/datasets
    datasets = os.listdir("projects/" + fname + "/datasets")
    datasetDetail = []
    for dataset in datasets:
        temp = {}
        temp["datasetName"] = dataset
        trainPath = "projects/" + fname + "/datasets/" + dataset + "/train/images/"
        temp["images"] = []
        for image in os.listdir(trainPath)[:6]:
            temp["images"].append(
                fname + "/datasets/" + dataset + "/train/images/" + image
            )
        temp["trainCount"] = len(
            os.listdir("projects/" + fname + "/datasets/" + dataset + "/train/images/")
        )
        temp["validCount"] = len(
            os.listdir("projects/" + fname + "/datasets/" + dataset + "/test/images/")
        )
        temp["testCount"] = len(
            os.listdir("projects/" + fname + "/datasets/" + dataset + "/valid/images/")
        )

        data["images"].append(temp["images"][0])
        data["images"].append(temp["images"][1])

        datasetDetail.append(temp)
    data["datasetDetail"] = datasetDetail
    folders = []
    for folder in os.listdir("projects/" + fname + "/models"):
        if os.path.isdir("projects/" + fname + "/models/" + folder):
            folders.append(folder)
    data["models"] = folders

    return HttpResponse(json.dumps({"data": data}), content_type="application/json")


@csrf_exempt
def cameraListFetcher(request):
    global h
    try:
        cameras = []
        count = 0
        for i in h.device_info_list:
            cameras.append([i.serial_number, i.display_name])
            count += 1
        if count > 0:
            return HttpResponse(
                json.dumps({"data": cameras}), content_type="application/json"
            )
        else:
            raise Exception("No Camera Found")
    except Exception as e:
        print(e)
        # get all camera using cv2
        cameras = []
        for i in range(5):
            cap = cv2.VideoCapture(i)
            if cap is None or not cap.isOpened():
                pass
            else:
                id = i
                name = "Camera " + str(i)
                cameras.append([id, name])
            cap.release()
        return HttpResponse(
            json.dumps({"data": cameras}), content_type="application/json"
        )


@csrf_exempt
def CameraSetting(request):
    global cameraSetting
    if request.method == "POST":
        try:
            cameraIndex = request.POST["cameraIndex"]
            exposure = request.POST.get("exposure", None)
            saturation = request.POST.get("saturation", None)
            contrast = request.POST.get("contrast", None)
            if exposure is not None:
                cameraSetting["Camera" + str(cameraIndex)]["exposure"] = int(exposure)
            if saturation is not None:
                cameraSetting["Camera" + str(cameraIndex)]["saturation"] = float(
                    saturation
                )
            if contrast is not None:
                cameraSetting["Camera" + str(cameraIndex)]["contrast"] = float(contrast)
            return HttpResponse(
                json.dumps(
                    {
                        "status": "success",
                    }
                ),
                content_type="application/json",
            )
        except Exception as e:
            return HttpResponse(
                json.dumps(
                    {
                        "status": "error",
                        "error": str(e),
                    }
                ),
                content_type="application/json",
            )
    else:
        return HttpResponse(
            json.dumps(
                {
                    "status": "error",
                    "error": "Invalid Request",
                }
            ),
            content_type="application/json",
        )
