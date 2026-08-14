"""
Views para la API REST del menú.
Endpoint principal: /api/categorias/ con productos anidados.
"""
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Categoria, Producto, CategoriaVIP, ProductoVIP
from .permissions import IsAdminOrReadOnly
from .serializers import CategoriaSerializer, ProductoSerializer, CategoriaVIPSerializer, ProductoVIPSerializer


@method_decorator(cache_page(60 * 2), name='list')
@method_decorator(cache_page(60 * 2), name='retrieve')
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.filter(activo=True).prefetch_related('productos').order_by('orden')
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdminOrReadOnly]

    @method_decorator(cache_page(60 * 2))
    @action(detail=False, methods=['get'])
    def menu_completo(self, request):
        categorias = self.get_queryset()
        serializer = self.get_serializer(categorias, many=True)
        return Response(serializer.data)


@method_decorator(cache_page(60 * 2), name='list')
@method_decorator(cache_page(60 * 2), name='retrieve')
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True).select_related('categoria')
    serializer_class = ProductoSerializer
    permission_classes = [IsAdminOrReadOnly]


@method_decorator(cache_page(60 * 2), name='list')
@method_decorator(cache_page(60 * 2), name='retrieve')
class CategoriaVIPViewSet(viewsets.ModelViewSet):
    queryset = CategoriaVIP.objects.filter(activo=True).prefetch_related('productos').order_by('orden')
    serializer_class = CategoriaVIPSerializer
    permission_classes = [IsAdminOrReadOnly]

    @method_decorator(cache_page(60 * 2))
    @action(detail=False, methods=['get'])
    def menu_completo(self, request):
        categorias = self.get_queryset()
        serializer = self.get_serializer(categorias, many=True)
        return Response(serializer.data)


@method_decorator(cache_page(60 * 2), name='list')
@method_decorator(cache_page(60 * 2), name='retrieve')
class ProductoVIPViewSet(viewsets.ModelViewSet):
    queryset = ProductoVIP.objects.filter(activo=True).select_related('categoria')
    serializer_class = ProductoVIPSerializer
    permission_classes = [IsAdminOrReadOnly]