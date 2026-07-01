"""
WSGI config for coursemanager project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

# Synchronous web server gateway integration hook utilized by default to serve application workloads to compatible web servers.

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coursemanager.settings')

application = get_wsgi_application()
