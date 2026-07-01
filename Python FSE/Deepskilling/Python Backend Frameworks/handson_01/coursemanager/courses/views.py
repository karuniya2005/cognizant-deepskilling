from django.shortcuts import render
from django.http import HttpResponse

def hello_view(request):
    """Simple function-based view checking system operational readiness."""
    return HttpResponse('Course Management API is running')
