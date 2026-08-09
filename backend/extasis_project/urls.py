"""
URL configuration for extasis_project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='http://localhost:5173/', permanent=False), name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('menu_app.urls')),
    path('api-auth/', include('rest_framework.urls')),
]

# Servir archivos media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Admin personalizado
admin.site.site_header = 'Restaurante Éxtasis — Admin'
admin.site.site_title = 'Administración Éxtasis'
admin.site.index_title = 'Gestión de Menú Digital'