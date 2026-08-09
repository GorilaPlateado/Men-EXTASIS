"""
Admin configuration for menu_app.
Gestión CRUD de categorías y productos con vista previa de imagen en tiempo real.
"""
from django.contrib import admin
from django.utils.html import format_html
from .models import Categoria, Producto, CategoriaVIP, ProductoVIP


# JavaScript que actualiza la vista previa al seleccionar un archivo
PREVIEW_JS = """
<script>
(function() {
    function bindPreview(inputId, previewId) {
        var input = document.getElementById(inputId);
        if (!input) return;
        input.addEventListener('change', function() {
            var preview = document.getElementById(previewId);
            if (!preview) return;
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    document.addEventListener('DOMContentLoaded', function() {
        bindPreview('id_imagen', 'imagen-preview');
    });
})();
</script>
"""


def _preview_widget(obj):
    """Devuelve el HTML de la vista previa + JS para actualización en tiempo real."""
    if obj and obj.imagen:
        img_html = format_html(
            '<img id="imagen-preview" src="{}" '
            'style="max-height:200px; max-width:300px; border-radius:6px; '
            'border:1px solid #ccc; display:block; margin-top:8px;" />',
            obj.imagen.url
        )
    else:
        img_html = format_html(
            '<img id="imagen-preview" src="" '
            'style="max-height:200px; max-width:300px; border-radius:6px; '
            'border:1px solid #ccc; display:none; margin-top:8px;" />'
        )
    return format_html('{}{}', img_html, PREVIEW_JS)


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'orden', 'activo', 'num_productos', 'thumbnail']
    list_editable = ['orden', 'activo']
    search_fields = ['nombre']
    list_filter = ['activo']
    ordering = ['orden', 'nombre']
    readonly_fields = ['vista_previa']
    fieldsets = [
        (None, {
            'fields': ['nombre', 'orden', 'activo']
        }),
        ('Imagen', {
            'fields': ['imagen', 'vista_previa'],
        }),
    ]

    def num_productos(self, obj):
        return obj.productos.filter(activo=True).count()
    num_productos.short_description = 'Productos activos'

    def thumbnail(self, obj):
        if obj.imagen:
            return format_html(
                '<img src="{}" style="height:40px; width:40px; '
                'object-fit:cover; border-radius:4px;" />',
                obj.imagen.url
            )
        return '—'
    thumbnail.short_description = 'Imagen'

    def vista_previa(self, obj):
        return _preview_widget(obj)
    vista_previa.short_description = 'Vista previa'


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'precio', 'activo', 'thumbnail']
    list_filter = ['categoria', 'activo']
    list_editable = ['precio', 'activo']
    search_fields = ['nombre', 'descripcion']
    autocomplete_fields = ['categoria']
    readonly_fields = ['vista_previa']
    list_select_related = ['categoria']
    fieldsets = [
        (None, {
            'fields': ['categoria', 'nombre', 'precio', 'activo']
        }),
        ('Imagen', {
            'fields': ['imagen', 'vista_previa'],
        }),
        ('Detalles', {
            'fields': ['descripcion'],
            'classes': ['collapse'],
        }),
    ]

    def thumbnail(self, obj):
        if obj.imagen:
            return format_html(
                '<img src="{}" style="height:40px; width:40px; '
                'object-fit:cover; border-radius:4px;" />',
                obj.imagen.url
            )
        return '—'
    thumbnail.short_description = 'Imagen'

    def vista_previa(self, obj):
        return _preview_widget(obj)
    vista_previa.short_description = 'Vista previa'

    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super().get_search_results(
            request, queryset, search_term
        )
        return queryset, use_distinct


# Admin personalizado
admin.site.site_header = 'Restaurante Éxtasis — Admin'
admin.site.site_title = 'Administración Éxtasis'
admin.site.index_title = 'Gestión de Menú Digital'


# ── Menú VIP ──────────────────────────────────────────────────────────────────

@admin.register(CategoriaVIP)
class CategoriaVIPAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'orden', 'activo', 'num_productos', 'thumbnail']
    list_editable = ['orden', 'activo']
    search_fields = ['nombre']
    list_filter = ['activo']
    ordering = ['orden', 'nombre']
    readonly_fields = ['vista_previa']
    fieldsets = [
        (None, {'fields': ['nombre', 'orden', 'activo']}),
        ('Imagen', {'fields': ['imagen', 'vista_previa']}),
    ]

    def num_productos(self, obj):
        return obj.productos.filter(activo=True).count()
    num_productos.short_description = 'Productos activos'

    def thumbnail(self, obj):
        if obj.imagen:
            return format_html(
                '<img src="{}" style="height:40px;width:40px;object-fit:cover;border-radius:4px;" />',
                obj.imagen.url
            )
        return '—'
    thumbnail.short_description = 'Imagen'

    def vista_previa(self, obj):
        return _preview_widget(obj)
    vista_previa.short_description = 'Vista previa'


@admin.register(ProductoVIP)
class ProductoVIPAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'precio', 'activo', 'thumbnail']
    list_filter = ['categoria', 'activo']
    list_editable = ['precio', 'activo']
    search_fields = ['nombre', 'descripcion']
    autocomplete_fields = ['categoria']
    readonly_fields = ['vista_previa']
    list_select_related = ['categoria']
    fieldsets = [
        (None, {'fields': ['categoria', 'nombre', 'precio', 'activo']}),
        ('Imagen', {'fields': ['imagen', 'vista_previa']}),
        ('Detalles', {'fields': ['descripcion'], 'classes': ['collapse']}),
    ]

    def thumbnail(self, obj):
        if obj.imagen:
            return format_html(
                '<img src="{}" style="height:40px;width:40px;object-fit:cover;border-radius:4px;" />',
                obj.imagen.url
            )
        return '—'
    thumbnail.short_description = 'Imagen'

    def vista_previa(self, obj):
        return _preview_widget(obj)
    vista_previa.short_description = 'Vista previa'

    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super().get_search_results(request, queryset, search_term)
        return queryset, use_distinct
