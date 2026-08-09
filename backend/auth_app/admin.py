"""
Admin para gestión de usuarios y perfiles.
Permite crear usuarios con rol Administrador o Camarera.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import PerfilUsuario


class PerfilInline(admin.StackedInline):
    model = PerfilUsuario
    can_delete = False
    verbose_name = 'Perfil'
    verbose_name_plural = 'Perfil'
    fields = ['rol']
    extra = 1

    def get_queryset(self, request):
        return super().get_queryset(request)


class UserAdmin(BaseUserAdmin):
    inlines = [PerfilInline]
    list_display = ['username', 'email', 'first_name', 'last_name', 'get_rol', 'is_active']
    list_filter = ['is_active', 'perfil__rol']

    def get_rol(self, obj):
        try:
            return obj.perfil.get_rol_display()
        except PerfilUsuario.DoesNotExist:
            return '—'
    get_rol.short_description = 'Rol'

    def save_model(self, request, obj, form, change):
        """Guardar el usuario."""
        super().save_model(request, obj, form, change)

    def save_related(self, request, form, formsets, change):
        """
        Guardar los formsets (inlines).
        Si el perfil ya existe, actualizar en vez de crear.
        """
        for formset in formsets:
            for inline_form in formset.forms:
                if inline_form.has_changed() or not change:
                    instance = inline_form.instance
                    if instance.pk is None and hasattr(form.instance, 'pk'):
                        # Verificar si ya existe un perfil para este usuario
                        existing = PerfilUsuario.objects.filter(
                            user=form.instance
                        ).first()
                        if existing:
                            # Actualizar el existente en vez de crear uno nuevo
                            rol = inline_form.cleaned_data.get('rol', existing.rol)
                            existing.rol = rol
                            existing.save()
                            inline_form.instance = existing
                            continue
        super().save_related(request, form, formsets, change)


# Reemplazar el UserAdmin por defecto
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
