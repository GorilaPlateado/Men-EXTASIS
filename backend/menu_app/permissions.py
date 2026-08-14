from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Permite acceso de lectura a cualquier usuario, pero solo permite
    modificaciones a usuarios con el rol administrador.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if not user or not user.is_authenticated:
            return False

        perfil = getattr(user, 'perfil', None)
        return getattr(perfil, 'rol', '') == 'administrador'
