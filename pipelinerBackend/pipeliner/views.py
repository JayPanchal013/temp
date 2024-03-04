from django.shortcuts import render


def main(request):
    return render(request, "index.html")


def main1(request, one):
    return render(request, "index.html")


def main2(request, one, two):
    return render(request, "index.html")


def main3(request, one, two, three):
    return render(request, "index.html")


def train(request):
    return render(request, "index.html")


def prediction(request):
    return render(request, "index.html")


def imageAnnotation(request):
    return render(request, "index.html")


def imageGallery(request):
    return render(request, "index.html")


def annotatorAllocation(request):
    return render(request, "index.html")
