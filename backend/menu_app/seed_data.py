"""
Seed inicial de categorías y productos.
Ejecutar: python manage.py loaddata seed_data.json
"""
import json
from decimal import Decimal


# Definición de datos según el prompt
CATEGORIAS = [
    {"nombre": "Aperitivos", "orden": 1},
    {"nombre": "Entrantes", "orden": 2},
    {"nombre": "Ensaladas", "orden": 3},
    {"nombre": "Platos Fuertes", "orden": 4},
    {"nombre": "Pastas", "orden": 5},
    {"nombre": "Bebidas", "orden": 6},
    {"nombre": "Postres", "orden": 7},
]

PRODUCTOS = [
    # Aperitivos
    ("Tostones", 200, "Aperitivos"),
    ("Croquetas de jamón", 250, "Aperitivos"),
    ("Empanadas cubanas", 280, "Aperitivos"),
    ("Pan con ajo", 150, "Aperitivos"),

    # Entrantes
    ("Sopa de pollo cubana", 250, "Entrantes"),
    ("Potaje cubano", 280, "Entrantes"),
    ("Sopa de pescado", 300, "Entrantes"),
    ("Caldo de res", 320, "Entrantes"),

    # Ensaladas
    ("Ensalada César", 250, "Ensaladas"),
    ("Ensalada Mixta", 200, "Ensaladas"),
    ("Ensalada de cebolla", 180, "Ensaladas"),
    ("Ensalada de lechuga", 150, "Ensaladas"),
    ("Ensalada de pepinos", 180, "Ensaladas"),
    ("Ensalada fría", 220, "Ensaladas"),

    # Platos Fuertes
    ("Bistec de cerdo", 600, "Platos Fuertes"),
    ("Bistec de res", 700, "Platos Fuertes"),
    ("Jamón asado", 550, "Platos Fuertes"),
    ("Pollo en salsa", 500, "Platos Fuertes"),
    ("Pollo frito", 450, "Platos Fuertes"),
    ("Pollo asado", 500, "Platos Fuertes"),
    ("Pescado frito", 650, "Platos Fuertes"),
    ("Pescado en salsa", 700, "Platos Fuertes"),

    # Pastas
    ("Espaguetis Napolitanos", 500, "Pastas"),
    ("Espaguetis Carbonara", 350, "Pastas"),
    ("Espaguetis Boloñesa", 400, "Pastas"),
    ("Espaguetis al Pesto", 450, "Pastas"),

    # Bebidas
    ("Cerveza Cristal", 120, "Bebidas"),
    ("Bucanero", 150, "Bebidas"),
    ("Heineken", 200, "Bebidas"),
    ("Mojito", 250, "Bebidas"),
    ("Cuba Libre", 250, "Bebidas"),
    ("Daiquiri", 300, "Bebidas"),
    ("Bloody Mary", 350, "Bebidas"),
    ("Refresco Tukola", 80, "Bebidas"),
    ("Refresco de Limón", 80, "Bebidas"),
    ("Refresco de Naranja", 80, "Bebidas"),

    # Postres
    ("Flan de vainilla", 200, "Postres"),
    ("Flan de coco", 220, "Postres"),
    ("Flan de caramelo", 230, "Postres"),
    ("Kake de chocolate", 300, "Postres"),
    ("Pastel de guayaba", 280, "Postres"),
    ("Pastel de queso", 320, "Postres"),
]


def generate_seed_json():
    """Genera archivo JSON para loaddata"""
    data = []
    pk_cat = 1

    # Categorías
    for cat in CATEGORIAS:
        data.append({
            "model": "menu_app.categoria",
            "pk": pk_cat,
            "fields": {
                "nombre": cat["nombre"],
                "orden": cat["orden"],
                "activo": True,
            }
        })
        pk_cat += 1

    # Productos
    pk_prod = 1
    cat_lookup = {c["nombre"]: i + 1 for i, c in enumerate(CATEGORIAS)}
    for nombre, precio, cat_nombre in PRODUCTOS:
        data.append({
            "model": "menu_app.producto",
            "pk": pk_prod,
            "fields": {
                "categoria": cat_lookup[cat_nombre],
                "nombre": nombre,
                "precio": str(precio),
                "descripcion": "",
                "imagen": None,
                "activo": True,
            }
        })
        pk_prod += 1

    return data


if __name__ == "__main__":
    data = generate_seed_json()
    with open("menu_app/fixtures/seed_data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Seed generado: {len(data)} registros")