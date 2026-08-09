"""
Modelo de perfil de usuario para el sistema de autenticación.
Extiende el User de Django con un campo de rol.
"""
from django.db import models
from django.contrib.auth.models import User


class PerfilUsuario(models.Model):
    ROL_ADMINISTRADOR = 'administrador'
    ROL_CAMARERA = 'camarera'

    ROLES = [
        (ROL_ADMINISTRADOR, 'Administrador'),
        (ROL_CAMARERA, 'Camarera'),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='perfil'
    )
    rol = models.CharField(
        max_length=20,
        choices=ROLES,
        default=ROL_CAMARERA
    )

    class Meta:
        verbose_name = 'Perfil de Usuario'
        verbose_name_plural = 'Perfiles de Usuarios'

    def __str__(self):
        return f'{self.user.username} ({self.get_rol_display()})'

    @property
    def es_administrador(self):
        return self.rol == self.ROL_ADMINISTRADOR

    @property
    def es_camarera(self):
        return self.rol == self.ROL_CAMARERA
