"""
Views de autenticación JWT.
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer
from .models import PerfilUsuario


class LoginView(TokenObtainPairView):
    """POST /api/auth/login/ — Devuelve access + refresh + datos del usuario."""
    serializer_class = LoginSerializer


class LogoutView(APIView):
    """POST /api/auth/logout/ — Invalida el refresh token."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'detail': 'Sesión cerrada correctamente.'}, status=200)
        except Exception:
            return Response({'detail': 'Token inválido.'}, status=400)


class MeView(APIView):
    """GET /api/auth/me/ — Devuelve los datos del usuario autenticado."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            rol = user.perfil.rol
        except PerfilUsuario.DoesNotExist:
            rol = 'camarera'

        return Response({
            'id': user.id,
            'username': user.username,
            'nombre': user.get_full_name() or user.username,
            'rol': rol,
        })
