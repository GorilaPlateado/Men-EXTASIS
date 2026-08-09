# AGENTS.md - Bar El Éxtasis Digital Menu Project

This document defines conventions for the Bar El Éxtasis digital menu project.
It is used by AI coding assistants to maintain consistency.

## Project Overview

**Restaurant**: Bar El Éxtasis  
**Type**: Digital static menu (Landing Page) with Django CRUD backend and React frontend  
**Stack**: Django 4.2, Django REST Framework, PostgreSQL, React 19, Tailwind CSS 3, Framer Motion

## Repository Structure

```
Extasis/
├── backend/
│   ├── extasis_project/        # Django project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── menu_app/               # Core menu application
│   │   ├── models.py          # Categoria, Producto
│   │   ├── admin.py
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   ├── urls.py
│   │   ├── seed_data.py
│   │   └── fixtures/
│   │       └── seed_data.json
│   └── run_prod.py             # Waitress server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── CategoryGrid.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks/
│   │   │   └── useApiUrl.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── images/
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   ├── .env
│   └── package.json
├── nginx/
│   └── nginx.conf
├── .venv/                      # Virtual environment (Python)
├── .env                        # Environment variables
├── requirements.txt
├── run_dev.bat                 # Development startup script
├── run_prod.bat                # Production startup script
└── AGENTS.md
```

## Development Workflow

### Environment Setup

1. **Python dependencies**:
   ```bat
   .venv\Scripts\pip install -r requirements.txt
   ```

2. **Frontend dependencies**:
   ```bat
   cd frontend
   npm install
   ```

3. **Run development**:
   ```bat
   run_dev.bat
   ```
   - API: http://localhost:8000
   - Frontend: http://localhost:5173
   - Admin: http://localhost:8000/admin (admin / admin123)

### Coding Standards

#### Backend (Django)
- Use Python 3.10+ type hints
- Use Django's built-in sanitization (no manual escaping needed in templates)
- Password hashing: Argon2 (configured in settings.py)
- CSRF protection on all Django views
- DRF uses session + basic auth; future JWT planned
- Database: PostgreSQL via psycopg2-binary

#### Frontend (React)
- React 19 with JSX
- Tailwind CSS for styling
- Framer Motion for animations (performance: `once` viewport, lazy)
- React Query for API data fetching with caching
- Mobile-first responsive design
- Heroicons v2 (outline style)

#### Component Architecture
```
App.jsx
├── Navbar.jsx          (fixed, red-900 background)
├── Hero.jsx            (full-screen section, background image)
├── CategoryGrid.jsx    (fetches API, renders categories)
│   └── ProductCard.jsx (individual product, hover scale)
└── Footer.jsx          (contact info, hours)
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categorias/` | List all active categories |
| GET | `/api/categorias/:id/` | Single category detail |
| GET | `/api/categorias/menu_completo/` | Full menu with products |
| GET | `/api/productos/` | List all active products |
| GET | `/api/productos/:id/` | Single product detail |

### Database Models

**Categoria**:
- `nombre` (str, unique, max=100)
- `orden` (int, default=0)
- `activo` (bool, default=True)

**Producto**:
- `categoria` (FK to Categoria)
- `nombre` (str, max=200)
- `precio` (DecimalField, 10.2)
- `descripcion` (text, nullable)
- `imagen` (ImageField, upload_to='productos/')
- `activo` (bool, default=True)

## Deployment

### Development (Windows)
```bat
run_dev.bat
```

### Production (Windows 10/11)
1. Build frontend:
   ```bat
   cd frontend
   npm run build
   ```
2. Start Django with Waitress:
   ```bat
   run_prod.bat
   ```

### Nginx (Optional for Production)
- Copy `nginx/nginx.conf` to nginx config directory
- Build React: `npm run build`
- Serve static from `frontend/dist/`
- Proxy `/api/` and `/admin/` to Waitress (localhost:8000)

## Troubleshooting

### Common Issues
- **psycopg2 error**: Ensure PostgreSQL is running and `menuOmar_db` exists
- **CORS error**: Check `CORS_ALLOWED_ORIGINS` in `.env` matches frontend URL
- **Image upload**: Ensure `media/` directory exists and is writable

### Useful Commands
```bash
# Django
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata menu_app/fixtures/seed_data.json
python manage.py runserver 8000

# Frontend
npm run dev
npm run build
npm run preview
```

## Color Palette & Fonts

- **Primary (Red)**: `#8B0000`
- **Accent (Amber)**: `#F5F5DC`
- **Gold**: `#D4AF37`
- **Dark Gray**: `#2C2C2C`
- **Font Headings**: Playfair Display (serif)
- **Font Body**: Inter (sans-serif)