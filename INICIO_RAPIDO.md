# Bar El Éxtasis — Inicio Rápido

## ▶ Arrancar el proyecto

Desde la carpeta `Extasis\`, doble clic en:

```
run_dev.bat
```

O desde una terminal en esa carpeta:

```bat
cd C:\Users\Admin\Desktop\Extasis
run_dev.bat
```

---

## 🌐 URLs

| Qué              | URL                              |
|------------------|----------------------------------|
| Menú (frontend)  | http://localhost:5173            |
| Admin Django     | http://localhost:8000/admin      |
| API REST         | http://localhost:8000/api/       |

**Usuario admin:** `admin`  
**Contraseña:**    `admin123`

---

## ⏹ Detener el proyecto

Cierra las dos ventanas de consola que abrió `run_dev.bat`,
o ejecuta:

```bat
stop_servers.bat
```

---

## 🗂 Estructura resumida

```
Extasis/
├── backend/        → Django (API + Admin)
├── frontend/       → React + Vite (interfaz)
├── media/          → Imágenes subidas desde el admin
├── .venv/          → Entorno virtual Python (no tocar)
├── run_dev.bat     → ← ESTE ES EL QUE USAS CADA DÍA
└── stop_servers.bat
```

---

## 🔧 Si algo falla al arrancar

**Error de Python / venv:**
```bat
py -3.13 -m venv .venv
.venv\Scripts\pip install -r requirements.txt
```

**Error de npm:**
```bat
cd frontend
npm install
```

**Error de base de datos:**
- Verifica que PostgreSQL esté corriendo
- Base de datos: `menuOmar_db` | Usuario: `postgres`

**Aplicar migraciones pendientes:**
```bat
cd backend
..\.venv\Scripts\python.exe manage.py migrate
```
