#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pipeliner.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(["pipeliner.py", "runserver"])


if __name__ == "__main__":
    main()


# pyinstaller --onedir --console --icon "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/static/logo.ico" --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/api;api/" --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/baseModels;baseModels/" --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/pipeliner;pipeliner/" --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/projects;projects/" --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/static;static/" --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/templates;templates/" --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/data.zip;." --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/db.sqlite3;." --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/manage.py;." --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/pipeliner.py;." --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/Pipeliner.spec;." --add-data "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/requirements2.txt;."  "D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/pipeliner.py"
