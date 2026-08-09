"""
Views para la API REST del menú.
Endpoint principal: /api/categorias/ con productos anidados.
"""
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Categoria, Producto, CategoriaVIP, ProductoVIP
from .serializers import CategoriaSerializer, ProductoSerializer, CategoriaVIPSerializer, ProductoVIPSerializer


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.filter(activo=True).prefetch_related('productos').order_by('orden')
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def menu_completo(self, request):
        categorias = self.get_queryset()
        serializer = self.get_serializer(categorias, many=True)
        return Response(serializer.data)


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Producto.objects.filter(activo=True).select_related('categoria')
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoriaVIPViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CategoriaVIP.objects.filter(activo=True).prefetch_related('productos').order_by('orden')
    serializer_class = CategoriaVIPSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def menu_completo(self, request):
        categorias = self.get_queryset()
        serializer = self.get_serializer(categorias, many=True)
        return Response(serializer.data)


class ProductoVIPViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductoVIP.objects.filter(activo=True).select_related('categoria')
    serializer_class = ProductoVIPSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]