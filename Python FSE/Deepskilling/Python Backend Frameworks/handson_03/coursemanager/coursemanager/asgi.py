"""
ASGI config for coursemanager project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
"""

# Asynchronous server interface hooks for deploying production workloads over asynchronous process runners and handling async features.

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coursemanager.settings')

application = get_asgi_application()
