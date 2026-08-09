"""
Serializers para autenticación JWT.
"""
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import PerfilUsuario


class LoginSerializer(TokenObtainPairSerializer):
    """Extiende el token con datos del usuario y su rol."""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Claims personalizados en el JWT
        try:
            token['rol'] = user.perfil.rol
            token['nombre'] = user.get_full_name() or user.username
        except PerfilUsuario.DoesNotExist:
            token['rol'] = 'camarera'
            token['nombre'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Añadir info del usuario en la respuesta
        user = self.user
        try:
            perfil = user.perfil
            rol = perfil.rol
        except PerfilUsuario.DoesNotExist:
            rol = 'camarera'

        data['usuario'] = {
            'id': user.id,
            'username': user.username,
            'nombre': user.get_full_name() or user.username,
            'rol': rol,
        }
        return data


class UsuarioSerializer(serializers.Serializer):
    """Devuelve los datos del usuario autenticado."""
    id = serializers.IntegerField()
    username = serializers.CharField()
    nombre = serializers.CharField()
    rol = serializers.CharField()
