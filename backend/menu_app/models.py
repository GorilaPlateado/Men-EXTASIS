"""
Models for the menu application.
Categorias y productos del menú digital (regular y VIP).
"""
from django.db import models


class Categoria(models.Model):
    """Categoría de productos (Pastas, Bebidas, etc.)"""
    nombre = models.CharField(max_length=100, unique=True)
    orden = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)
    imagen = models.ImageField(
        upload_to='categorias/',
        blank=True,
        null=True,
        help_text='Imagen representativa de la categoría'
    )

    class Meta:
        ordering = ['orden', 'nombre']
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    """Producto individual dentro de una categoría"""
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.CASCADE,
        related_name='productos'
    )
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField(blank=True, null=True)
    imagen = models.ImageField(
        upload_to='productos/',
        blank=True,
        null=True,
        help_text='Imagen del producto (máx 5MB)'
    )
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ['categoria__orden', 'categoria__nombre', 'nombre']
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.nombre

    @property
    def imagen_url(self):
        """Devuelve la URL de la imagen o placeholder"""
        if self.imagen:
            return self.imagen.url
        return '/placeholder-food.png'

    def save(self, *args, **kwargs):
        # Sanitizar nombre de archivo
        if self.imagen and not self.imagen.name.startswith('productos/'):
            self.imagen.name = f'productos/{self.imagen.name}'
        super().save(*args, **kwargs)


class CategoriaVIP(models.Model):
    """Categoría del menú VIP"""
    nombre = models.CharField(max_length=100, unique=True)
    orden = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)
    imagen = models.ImageField(
        upload_to='categorias_vip/',
        blank=True,
        null=True,
        help_text='Imagen representativa de la categoría VIP'
    )

    class Meta:
        ordering = ['orden', 'nombre']
        verbose_name = 'Categoría VIP'
        verbose_name_plural = 'Categorías VIP'

    def __str__(self):
        return f'[VIP] {self.nombre}'


class ProductoVIP(models.Model):
    """Producto del menú VIP"""
    categoria = models.ForeignKey(
        CategoriaVIP,
        on_delete=models.CASCADE,
        related_name='productos'
    )
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField(blank=True, null=True)
    imagen = models.ImageField(
        upload_to='productos_vip/',
        blank=True,
        null=True,
        help_text='Imagen del producto VIP (máx 5MB)'
    )
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ['categoria__orden', 'categoria__nombre', 'nombre']
        verbose_name = 'Producto VIP'
        verbose_name_plural = 'Productos VIP'

    def __str__(self):
        return self.nombre

    @property
    def imagen_url(self):
        if self.imagen:
            return self.imagen.url
        return None
