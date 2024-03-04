

# Introduction

The goal of this project is to provide a tool for annotating images and preparing them for YOLO model, and then training YOLO model to predict real-time fabric defect detection. The tool will provide a user-friendly interface for annotating images with bounding boxes, and will also generate the necessary annotation files in the YOLO format. The YOLO model will be trained on a dataset of annotated images, and will then be able to detect fabric defects in real time.

This project requires python 3.11 

![Fabric Scan](https://github.com/TheJagStudio/pipeliner/raw/main/pipelinerBackend/static/fabricScanHome.png)


### Main features

* Image Annotation Module

* Training Module

* CVAT integration

* Prediction Module

* Annotator Allocation Module


# Usage

### Installing inside virtualenv 

Firstly, you have to install virtualenv

	$ pip3 install virtualenv
To create a virtualenv  change into a directory where you store your project files. Within the project directory, create a Python virtual environment by typing:

	$ python3 -m venv myprojectenv
After creating virtualenv you need to activate that virtualenv.

	$ source myprojectenv/bin/activate

After activating virtualenv you need to install all project dependencies:

    $ pip install -r requirements.txt
    


#  Fabric Scan 

# Getting Started

You can now run the development server:

    $ python manage.py runserver
