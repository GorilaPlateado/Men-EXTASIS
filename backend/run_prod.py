"""
Servidor de producción para Windows usando Waitress.
Ejecutar: python run_prod.py
"""
import os
from waitress import serve
from extasis_project.wsgi import application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'extasis_project.settings')

if __name__ == '__main__':
    print("=" * 50)
    print("  Bar El Éxtasis - Servidor de Producción")
    print("  Waitress WSGI Server")
    print("=" * 50)
    print("Iniciando servidor en http://127.0.0.1:8000")
    serve(application, host='0.0.0.0', port=8000)