"""
Serializers para la API REST del menú.
Optimizados con select_related para evitar N+1 queries.
"""
from rest_framework import serializers
from .models import Categoria, Producto, CategoriaVIP, ProductoVIP


class ProductoSerializer(serializers.ModelSerializer):
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'descripcion', 'imagen_url', 'activo']
        read_only_fields = ['id']

    def get_imagen_url(self, obj):
        """Devuelve URL absoluta de la imagen"""
        if obj.imagen:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.imagen.url) if request else obj.imagen.url
        return None


class CategoriaSerializer(serializers.ModelSerializer):
    productos = ProductoSerializer(many=True, read_only=True)

    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'orden', 'productos']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Filtrar productos inactivos
        data['productos'] = [p for p in data['productos'] if p.get('activo', True)]
        return data


class ProductoVIPSerializer(serializers.ModelSerializer):
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductoVIP
        fields = ['id', 'nombre', 'precio', 'descripcion', 'imagen_url', 'activo']
        read_only_fields = ['id']

    def get_imagen_url(self, obj):
        if obj.imagen:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.imagen.url) if request else obj.imagen.url
        return None


class CategoriaVIPSerializer(serializers.ModelSerializer):
    productos = ProductoVIPSerializer(many=True, read_only=True)
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = CategoriaVIP
        fields = ['id', 'nombre', 'orden', 'imagen_url', 'productos']

    def get_imagen_url(self, obj):
        if obj.imagen:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.imagen.url) if request else obj.imagen.url
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['productos'] = [p for p in data['productos'] if p.get('activo', True)]
        return data