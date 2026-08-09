"""
URLs de la app menu_app.
"""
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet, CategoriaVIPViewSet, ProductoVIPViewSet

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'vip/categorias', CategoriaVIPViewSet, basename='categoria-vip')
router.register(r'vip/productos', ProductoVIPViewSet, basename='producto-vip')

urlpatterns = router.urls