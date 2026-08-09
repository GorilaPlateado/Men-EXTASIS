"""
WSGI config for extasis_project project.
Usado por Waitress en producción.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'extasis_project.settings')

application = get_wsgi_application()