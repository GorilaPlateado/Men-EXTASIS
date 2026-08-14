from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from menu_app.models import Categoria, Producto
from auth_app.models import PerfilUsuario


class ApiRoleTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_user(username='admin', password='admin123')
        self.camarera_user = User.objects.create_user(username='camarera', password='camarera123')
        PerfilUsuario.objects.create(user=self.admin_user, rol=PerfilUsuario.ROL_ADMINISTRADOR)
        PerfilUsuario.objects.create(user=self.camarera_user, rol=PerfilUsuario.ROL_CAMARERA)
        self.categoria = Categoria.objects.create(nombre='Test', orden=1, activo=True)
        self.producto = Producto.objects.create(
            categoria=self.categoria,
            nombre='Producto test',
            precio='100.00',
            descripcion='Descripción test',
            activo=True,
        )

    def test_admin_can_create_categoria(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.post('/api/categorias/', {'nombre': 'Nueva', 'orden': 2, 'activo': True}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Categoria.objects.filter(nombre='Nueva').exists())

    def test_camarera_cannot_create_categoria(self):
        self.client.login(username='camarera', password='camarera123')
        response = self.client.post('/api/categorias/', {'nombre': 'Nueva 2', 'orden': 2, 'activo': True}, format='json')
        self.assertEqual(response.status_code, 403)

    def test_admin_can_update_producto(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.patch(f'/api/productos/{self.producto.id}/', {'precio': '120.00'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.producto.refresh_from_db()
        self.assertEqual(str(self.producto.precio), '120.00')

    def test_camarera_cannot_delete_producto(self):
        self.client.login(username='camarera', password='camarera123')
        response = self.client.delete(f'/api/productos/{self.producto.id}/')
        self.assertEqual(response.status_code, 403)
